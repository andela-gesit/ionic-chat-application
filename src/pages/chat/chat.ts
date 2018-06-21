import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {Subscription} from "rxjs";
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  message: string = ''
  username: string = ''
  messages: object[] = []
  _chatSubscription

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase) {
      this.username = this.navParams.get(('username'))
      this._chatSubscription = this.db.list('/chat').valueChanges().subscribe((data) => {
        this.messages = data
      })
  }

  sendMessage() {
    if(this.message.length > 0) {
      this.db.list('/chat').push({
        username: this.username,
        message: this.message
      }).then(() => {
        this.message = ""
      })
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} has joined the room`
    })
  }

  ionViewWillLeave() {
    console.log('This user is about to leave')
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} has joined the room`
    })
    this._chatSubscription.unsubscribe()
  }
}

