import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: string = ''

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  alert(title: string, subTitle: string) {
    const alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: ['OK', 'Cancel']
    }).present()
  }

  loginUser() {
    if(/^[a-zA-Z0-9]+$/.test(this.username)) {
      this.navCtrl.push(ChatPage, {
        username: this.username
      })
    } else {
      this.alert('Error', 'Invalid Username')
    }
  }
}

