import { Injectable } from '@angular/core';

import { AlertService } from '../../services/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  returnUrl: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    /* return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password); */
    /* .then(value => {
      console.log('Sucesso!', value);
    })
    .catch(err => {
      this.alertService.error(err.message);
    }); */
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });

  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.alertService.success(`Olá ${data.user.email}!`, true);

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.router.navigate([this.returnUrl]);
      })
      .catch(err => {
        this.alertService.error(err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();

    localStorage.removeItem('currentUser');
  }

}
