import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';



/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public  resposeData : any;
  public userDetails : any;
  public dataSet : any;
  public userinfo : any;

  public profileUrl: any;
  public gender:any;
  public department:any;

  public userData = { "displayName": "", "photoURL":"","email":"","phone":"","isphoneVisible":"","dob":"","marital":"","gender":"","bloodgroup":"","dept":"","passout":"","employeType":"","compnayName":"","role":"","location":"","status":""};
  userPostData = {"user_id":"", "token":""};
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:UserProvider) {

  }

  getUser(){
    this.user.getUserDetails().then((res:any)=>{
      this.userData = res;
    })
  }

   profileEdit(){

    this.navCtrl.push("ProfileeditPage",{
       "name": this.userData.displayName,
       "email":this.userData.email,
       "phone":this.userData.phone,
       "isphoneVisible":this.userData.isphoneVisible,
       "dob":this.userData.dob,
       "maritial":this.userData.marital,
       "bloodgroup":this.userData.bloodgroup,
       "dept":this.userData.dept,
       "genid":this.userData.gender,
       "passout":this.userData.passout,
       "employeetype":this.userData.employeType,
       "cname":this.userData.compnayName,
       "crole":this.userData.role,
       "clocation":this.userData.location,
      });

  }

  navigateToUpdatePage(){
    this.navCtrl.push("EditstatusPage",{status:this.userData.status})
  }

  ionViewWillEnter(){
    this.getUser();
  }

}
