import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private myToast: any;

  constructor(
    private toast: ToastController
  ) { }

  // Present Toast 
  showToast(msg : string) {
    this.myToast = this.toast.create({
      message: msg,
      position: 'top',
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }

  // Hide Toast
  hideToast() {
    this.myToast = this.toast.dismiss();
  }

}