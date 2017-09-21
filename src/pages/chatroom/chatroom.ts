import { ChathandlerProvider } from './../../providers/chathandler/chathandler';
import { RequestserviceProvider } from './../../providers/requestservice/requestservice';
import { Component } from '@angular/core';
import { NavController, NavParams, Events, ToastController,IonicPage } from 'ionic-angular';
/**
 * Generated class for the ChatroomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {
  option:string = "messages";
  myreq;
  myfriends;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private requestservice : RequestserviceProvider,private events : Events,
private toastCtrl: ToastController,private chats :ChathandlerProvider) {
  }

  ionViewWillEnter() {
    this.requestservice.getmyrequest();
    this.requestservice.getmyfriends();
    this.events.subscribe('gotrequest',()=>{
      this.myreq = [];
      this.myreq = this.requestservice.userDetails;
    })


    this.events.subscribe('friends',()=>{
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    })
  }

  ionViewDidLeave(){
    this.events.unsubscribe('gotrequest');
    this.events.unsubscribe('friends');
  }

  chat(chatter){
    this.chats.initializeChat(chatter);
    this.navCtrl.push("ChatPage");
  }

  accept(recipiant){
    this.requestservice.acceptrequest(recipiant).then(()=>{
      this.presentToast("Friend added tap on the friend to chat with him");
    })

  }

  ignore(recipiant){
      this.requestservice.deleterequest(recipiant).then(()=>{

      }).catch((err)=>{

      })
  }

  navigateToFriendList(){
    this.navCtrl.push("FriendlistPage")
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
