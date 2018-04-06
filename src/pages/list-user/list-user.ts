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
    var loading = this.common.presentLoading();
    this.user.listUsers().subscribe((resp: any) => {
      this.userList = resp.Data;
      loading.dismiss();
    }, (err) => {
    });
  }

  refreshPage(refresher) {
    this.loadUsers();
    refresher.complete();
  }

  authorizeUser(usr) {
    var loading = this.common.presentLoading();
    usr.IsAuthorized = 1;
    this.user.update(usr).subscribe((resp: any) => {
      this.common.popToast("User authorization completed.");
      loading.dismiss();
    }, (err) => {
      this.common.popToast("User authorization failed!");
      loading.dismiss();
    });
  }

  unauthorizeUser(usr) {
    var loading = this.common.presentLoading();
    usr.IsAuthorized = 0;
    this.user.update(usr).subscribe((resp: any) => {
      this.common.popToast("User unauthorization completed.");
      loading.dismiss();
    }, (err) => {
      this.common.popToast("User unauthorization failed!");
      loading.dismiss();
    });
  }
}
