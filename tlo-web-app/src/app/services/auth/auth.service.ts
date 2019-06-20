import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  returnUrl: string;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
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
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        },
          err => reject(err)
        );
    });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    localStorage.removeItem('currentUser');
  }

}
