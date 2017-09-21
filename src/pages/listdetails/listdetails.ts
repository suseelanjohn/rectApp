import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the ListdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-listdetails',
  templateUrl: 'listdetails.html',
})
export class ListdetailsPage {


  public userData = { "displayName": "", "photoURL":"","email":"","phone":"","isphoneVisible":true,"dob":"","maritial":"","genid":"","bloodgroup":"","dept":"","passout":"","employeetype":"","cname":"","crole":"","clocation":"" };
  userPostData = {"user_id":"", "token":""};
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.userData.displayName = navParams.get('name');
    this.userData.photoURL = navParams.get('photoURL');
    this.userData.email = navParams.get('email');
    this.userData.phone = navParams.get('phone');
    this.userData.isphoneVisible = navParams.get('isphoneVisible');
    this.userData.maritial = navParams.get('maritial');
    this.userData.bloodgroup = navParams.get('bloodgroup');
    this.userData.dob = navParams.get('dob');
    this.userData.dept = navParams.get('dept');
    this.userData.genid= navParams.get('genid');
    this.userData.passout = navParams.get('passout');
    this.userData.employeetype = navParams.get('employeetype');
    this.userData.cname = navParams.get('cname');
    this.userData.crole = navParams.get('crole');
    this.userData.clocation = navParams.get('clocation');

  }

}
