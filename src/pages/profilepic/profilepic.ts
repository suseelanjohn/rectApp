import { UserProvider } from './../../providers/user/user';
import { ImghandlerProvider } from './../../providers/imghandler/imghandler';
import { Component,NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';

/**
 * Generated class for the ProfilepicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {

  imgurl ='https://firebasestorage.googleapis.com/v0/b/rectapp-5dfb1.appspot.com/o/boy.png?alt=media&token=80cd8a81-e1ad-4915-a1b3-a306e1c4e7bd';
  moveOn =true;
  displayName = '';
  constructor(public loadingCtrl:LoadingController,
    private imgHandler : ImghandlerProvider,
    private user : UserProvider,
    public ngzone : NgZone,
    public navCtrl: NavController, public navParams: NavParams) {
      this.displayName = this.navParams.get('displayName');
  }

  ionViewDidLoad() {

  }

  chooseImage(){
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();

    this.imgHandler.uploadimage().then((uploadUrl:any)=>{
      loader.dismiss();
      this.ngzone.run(()=>{
        this.imgurl = uploadUrl;
        this.moveOn = false;
      })
    }).catch((err)=>{
      loader.dismiss();
      alert(err);
    })
  }

  proceed(){
    this.navCtrl.setRoot("HomePage");
  }

  updateproceed(){
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.user.updateimage(this.imgurl).then((res:any)=>{
      loader.dismiss();
      if (res.success) {
        this.navCtrl.setRoot("HomePage");
      }
      else {
        alert(res);
      }
    })
  }

}
