import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage} from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  splash = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(localStorage.getItem('userData')){
     this.navCtrl.setRoot("HomePage");
   }
  }

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 3000);
  }

  login(){
    this.navCtrl.push("LoginPage");
  }

  signup(){
    this.navCtrl.push("SignupPage");
  }

}
