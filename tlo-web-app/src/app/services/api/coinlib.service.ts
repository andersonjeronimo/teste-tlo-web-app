import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoinlibService {
  private apiKey = environment.coinLib.apiKey;
  private apiURL = environment.coinLib.apiURL;

  constructor(private http: HttpClient) { }

  getCoinList(pref, page) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(
        `${this.apiURL}coinlist?key=${this.apiKey}&pref=${pref}&page=${page}`
        )
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  getCoin() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${this.apiURL}coin?key=${this.apiKey}`)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

}
