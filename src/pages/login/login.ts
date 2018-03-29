import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { Common } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { username: string, password: string };
  username: string;
  password: string;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public common: Common,
    public translateService: TranslateService,
    private storage: Storage) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.setAccountFromStorage();
  }

  setAccountFromStorage() {
    this.storage.get('account').then((val) => {
      if (val != null) {
        this.account = JSON.parse(val);
      } else {
        this.account = { username: 'test@example.com', password: 'test' };
      }
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp: any) => {
      if (resp.Status == 'success')
        this.navCtrl.push(MainPage);
      else {
        this.common.popToastErrResp(resp);
      }
    }, (err) => {
      // Unable to log in
      this.common.popToast(this.loginErrorString);
    });
  }
}
