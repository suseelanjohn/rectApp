import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, IonicPage } from 'ionic-angular';


/**
 * Generated class for the ProfileeditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-profileedit',
  templateUrl: 'profileedit.html',
})
export class ProfileeditPage {

  public userDetails:any;
  public resposeData:any;

  public userData = { "displayName": "", "photoURL":"","email":"","phone":"","isphoneVisible":"","dob":"","maritial":"","genid":"","bloodgroup":"","dept":"","passout":"","employeetype":"","cname":"","crole":"","clocation":"" };
  userPostData = {"user_id":"", "token":""};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl : ToastController,private userservice : UserProvider,public loadCtrl:LoadingController) {


    this.userData.displayName = navParams.get('name');
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
    console.log(this.userData.isphoneVisible);
  }


  edit(){
    let loader = this.loadCtrl.create({
      content: 'Please Wait'
    });
    loader.present();
    this.userservice.updateUser(this.userData).then((res:any)=>{
      if(res.success)
        loader.dismiss();
        this.presentToast("Profile Updated Successfully");
    }).catch((err)=>{
      loader.dismiss();
      console.log(err);
        this.presentToast(err)
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
