import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '../api/api';

@Injectable()
export class User {
  _user: any;

  constructor(public api: Api, public storage: Storage) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.get('CorpusTagger', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.Status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    this.storage.set('account', JSON.stringify(accountInfo));

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('CorpusTagger', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.Status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  autoLogin() {
    this.storage.get('account').then((val) => {
      if (val != null) {
        let account = JSON.parse(val);

        this.login(account).subscribe((resp: any) => {
          if (resp.Status == 'success') {
          }
        });
      }
    });
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.Data;
  }
}
