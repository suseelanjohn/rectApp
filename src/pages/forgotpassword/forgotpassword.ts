import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController, IonicPage } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';


/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  useremail: string;

  constructor(private userauth: UserProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public loadCtrl:LoadingController,
    public alertCtrl: AlertController) {
  }

  resetPassword(){
   // firebase.auth.
   let loader = this.loadCtrl.create({
    content: 'Please Wait'
   });


   let alert = this.alertCtrl.create({
    buttons: ['Ok']
  });


  if(this.useremail){
    loader.present();
    this.userauth.passwordResetEmail(this.useremail).then((res:any)=>{
      loader.dismiss();
      if(res.success){
        alert.setTitle('Email Sent');
        alert.setSubTitle('Please follow the instructions in the email to reset your password');
        alert.present();
      }
    }).catch((err)=>{
      this.presentToast("Err");
    })
  }else{
    this.presentToast('Email field is required');
  }


  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
