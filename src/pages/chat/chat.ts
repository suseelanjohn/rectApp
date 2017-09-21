import { ChathandlerProvider } from './../../providers/chathandler/chathandler';
import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Content, IonicPage } from 'ionic-angular';
import  firebase from 'firebase';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild('content') content: Content;

  chatter:any;
  newmessage;
  allmessages = [];
  photoURL;
  imgornot;

  constructor(public navCtrl: NavController, public navParams: NavParams,private chats:ChathandlerProvider,
  private events : Events) {
    this.chatter = this.chats.chatter;
    this.events.subscribe('newmessage',()=>{
      this.allmessages = [];
      this.allmessages = this.chats.messages;
      this.photoURL = firebase.auth().currentUser.photoURL;
      this.scrollto();
    })
  }
  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }
  ionViewDidEnter() {
    this.chats.getbuddymessages();
  }

  ionViewWillLeave(){
    this.events.unsubscribe('newmessages');
  }

  addmessage(){
    this.chats.addnewMessage(this.newmessage).then(()=>{
      this.newmessage = '';
    })
  }

}
