import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../providers/providers';
import { Common } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-user',
  templateUrl: 'list-user.html',
})
export class ListUserPage {
  userList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: User, private common: Common) {
  }

  ionViewDidLoad() {
    this.loadUsers();
  }

  loadUsers() {
    this.user.listUsers().subscribe((resp: any) => {
      this.userList = resp.Data;
    }, (err) => {
    });
  }

  refreshPage(refresher) {
    this.loadUsers();
    refresher.complete();
  }

  authorizeUser(usr) {
    usr.IsAuthorized = 1;
    this.user.update(usr).subscribe((resp: any) => {
      this.common.popToast("User authorization completed.");
    }, (err) => {
      this.common.popToast("User authorization failed!");
    });
  }

  unauthorizeUser(usr) {
    usr.IsAuthorized = 0;
    this.user.update(usr).subscribe((resp: any) => {
      this.common.popToast("User unauthorization completed.");
    }, (err) => {
      this.common.popToast("User unauthorization failed!");
    });
  }
}
