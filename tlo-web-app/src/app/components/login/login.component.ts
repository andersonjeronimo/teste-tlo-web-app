import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../services/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  templateUrl: 'login.component.html',
  selector: 'app-login',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .then(data => {
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.alertService.success(`Olá ${data.user.email}!`, true);
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigate([this.returnUrl]);
      this.loading = false;
    })
    .catch(err => {
      this.alertService.error(err.message);
      this.loading = false;
    });

  }
}
