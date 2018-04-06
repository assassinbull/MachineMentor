import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Injectable()
export class Common {

  constructor(public toastCtrl: ToastController, public storage: Storage
    , public loadingCtrl: LoadingController) {
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

  createLoading() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 30000
    });

    return loading;
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 30000
    });

    loading.present();

    return loading;
  }

  presentLoadingCustom(textContent:string) {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: textContent,
      duration: 3000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();

    return loading;
  }
}
