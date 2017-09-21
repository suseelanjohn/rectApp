import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { UserProvider } from './../../providers/user/user';
import { Component,NgZone } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage,PopoverController } from 'ionic-angular';

import  firebase from 'firebase';

import { LocalNotifications } from '@ionic-native/local-notifications';



/**
 * Generated class for the WallPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-wall',
  templateUrl: 'wall.html',
})
export class WallPage {
  username:string;
  avatar : string;
  email:string;

  public resposeData :any;
  public dataSet :any;

  userPostData = {"user_id":"1","token":"1"}
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private user: UserProvider,public zone:NgZone,private authService : AuthServiceProvider,public toastCtrl: ToastController,private popoverCtrl: PopoverController,private localNotifications: LocalNotifications) {

    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Rect Wellcomes you please verify the latest wall and job post'
    });

  }

  ionViewWillEnter() {
    this.loaduserdetails();
    this.getWallData();
  }

  loaduserdetails(){
      this.user.getUserDetails().then((res:any)=>{
        this.zone.run(()=>{
          this.username = res.displayName;
          this.avatar = res.photoURL;
          this.email = res.email;
        })
      })
  }


  getWallData(){
    this.authService.postData(this.userPostData,"wall").then((result)=>{
      this.resposeData = result;
      if(this.resposeData.feedData){
          this.dataSet = this.resposeData.feedData;
      }else{
          this.presentToast("No network access");
      }

    })
  }
  presentPopover(event){
    let popover = this.popoverCtrl.create("PopoverPage");
    popover.present({
      ev: event
    });
  }
  userprofile(){
    this.navCtrl.push("ProfilePage");
  }

  aluminidetails(){
    this.navCtrl.push("AluminidetailsPage");
  }

  chatroom(){
    this.navCtrl.push("ChatroomPage");
  }

  changepassword(){
    this.navCtrl.push("ChangepasswordPage");
  }

  logOut(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.parent.parent.setRoot("LoginPage");
    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
