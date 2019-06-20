import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../services/alert/alert.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  reveal = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  revealPasswd() {
    this.reveal = !(this.reveal);
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const user = this.registerForm.value;
    this.authService.signup(user.username, user.password)
    .then(value => {
        this.alertService.success('Cadastro efetuado com sucesso!', true);
        this.loading = false;
        this.registerForm.reset();
        this.loading = false;
      })
      .catch(err => {
        this.alertService.error(err.message);
        this.registerForm.reset();
        this.loading = false;
      });


  }
}
