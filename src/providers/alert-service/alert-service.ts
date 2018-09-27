import { Injectable } from '@angular/core';
import {AlertController, ToastController} from "ionic-angular";

/*
  Generated class for the AlertServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertServiceProvider {

  constructor(private alertCtrl: AlertController, public toastCtrl: ToastController) {}

  /**
   *
   * @param {string} msg
   * @param {string} position = top, middle, bottom
   * @param {number} duration
   */
  showToast(msg: string, position?: string, duration?: number) {
    if(!duration) duration = 2000;
    if(!position) position = 'bottom';

    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: position
    });

    toast.present(toast);
  }

  show(title: string, message: string, buttons: any[]) {
    let alertInst = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    });

    alertInst.present();
  }


}
