import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { Settings } from '../../providers/providers';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { FirstRunPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  constructor(public viewCtrl: ViewController, public splashScreen: SplashScreen
    , public navCtrl: NavController, public storage: Storage
    , private settings: Settings, private user: User
  ) { }

  ionViewDidEnter() {
    setTimeout(() => {
      //Do auto login
      var settingValue: any = this.settings.getValue("autoLogin");
      if (settingValue) {
        this.storage.get('account').then((val) => {
          if (val != null) {
            let account = JSON.parse(val);

            this.user.login(account).subscribe((resp: any) => {
              if (resp.Status == 'success') {
                this.navCtrl.push(MainPage);
              }
            }, (err) => {
              this.navCtrl.push(FirstRunPage);
            });
          } else {
            this.navCtrl.push(FirstRunPage);
          }
        }, (err) => {
          this.navCtrl.push(FirstRunPage);
        });
      }
      else
        this.navCtrl.push(FirstRunPage);
    }, 2000);
  }
}
