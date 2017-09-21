import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, IonicPage } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import { FCM } from '@ionic-native/fcm';
import  firebase  from 'firebase'

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  tokenRef = firebase.database().ref('/usertokens');

  userData = { "username": "", "password": "", "email": "", "myDate": "", "gender": ""};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private toastCtrl: ToastController,
    private user: UserProvider,
    private loadCtrl: LoadingController,
    private fcm : FCM) {
      // constructor method
  }




  signUp() {

    let loader = this.loadCtrl.create({
      content: 'Please Wait'
    });



    if (this.userData.username && this.userData.password && this.userData.email && this.userData.myDate && this.userData.gender) {
      loader.present();
      //Api connections
      this.user.adduser(this.userData).then((res: any) => {

        this.fcm.onNotification().subscribe(data=>{
          if(data.wasTapped){
            alert(JSON.stringify(data));
          } else {
            alert(JSON.stringify(data));
          };
        })


        this.fcm.getToken().then(token=>{
          this.tokenRef.push({
            uid:firebase.auth().currentUser.uid,
            token:token
          })
        })


        if (res.success) {
          loader.dismiss();
          this.navCtrl.push("ProfilepicPage",{
            displayName:this.userData.username
          });
        } else {
          loader.dismiss();
          this.presentToast("Give valid information.");
        }
      }).catch((err)=>{
        loader.dismiss();
        this.presentToast(err.message);
      })
    } else {
        this.presentToast("All fileds are required");
    }

  }

  login() {
    this.navCtrl.push("LoginPage");
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
