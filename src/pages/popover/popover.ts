import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage,ViewController,App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private  _afa:AngularFireAuth,public viewCtrl: ViewController, public appCtrl: App) {
  }

  navigateToProfile(){
    this.navCtrl.push("ProfilePage");
  }

  navigateToEvents(){
    this.navCtrl.push("MyeventPage");
  }

  navigateToJobAlert(){
    this.navCtrl.push("MyalertPage");
  }

  signoutuser(){
    console.log("Here Comes ");
    this._afa.auth.signOut().then(()=>{
      console.log("Here Comes 2");
      // dismis the current popover
      this.viewCtrl.dismiss();
      this.appCtrl.getRootNav().setRoot("LoginPage");

    });
  }



}
