import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the EditstatusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-editstatus',
  templateUrl: 'editstatus.html',
})
export class EditstatusPage {

  status:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _user : UserProvider,public toastCtrl:ToastController,public loadCtrl:LoadingController) {
    this.status = this.navParams.get('status');
  }


  //this function update the user status
  updatestatus(userstatus){
    let loader = this.loadCtrl.create({
      content: 'Please Wait'
    });

    if(userstatus != ""){
      loader.present();
      this._user.updatestatus(userstatus).then((res:any)=>{
        if(res.success == true){
          loader.dismiss();
          this.presentToast("Status updated successfully....");
        }
      }).catch((err)=>{
          loader.dismiss();
          this.presentToast(err);
      })
    }else{
        this.presentToast("Please enter the status");
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
