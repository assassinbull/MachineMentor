import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Common {

  constructor(public toastCtrl: ToastController, public storage: Storage) {
  }

  popToastErrResp(errResp: any) {
    this.popToast(errResp.Messages[0].Value);
  }

  popToast(message) {
    this.popToastDuration(message, 3000);
  }

  popToastDuration(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top'
    });
    toast.present();
  }
}
