import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  resposeData: any;
  userData = {
    "useremail": "",
    "password": ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthServiceProvider,
    private toastCtrl: ToastController) {
  }

  login() {
    if (this.userData.useremail && this.userData.password) {
      this.authService
        .signIn(this.userData)
        .then((result: any) => {
          if (!result.code) {
            this
              .navCtrl.setRoot("HomePage");
          } else {
            this.presentToast("Incorrect username or password");
          }
        }).catch((err) => {
          this.presentToast(err.message);
        })
    }
    else {
      this.presentToast("All the fields are rquired");
    }

  }


  navigateToSignUpPage() {
    this.navCtrl.push("SignupPage");
  }

  navigateToForgotPassword() {
    this.navCtrl.push("ForgotpasswordPage");
  }



  presentToast(msg) {
    let toast = this
      .toastCtrl
      .create({ message: msg, duration: 2000 });
    toast.present();
  }

}
