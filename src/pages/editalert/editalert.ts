import { JobserviceProvider } from './../../providers/jobservice/jobservice';
import { JobPost } from './../../module/job/job.interface';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the EditalertPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-editalert',
  templateUrl: 'editalert.html',
})
export class EditalertPage {
  jobPost = {} as JobPost;
  key:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _jobservice : JobserviceProvider,public toastCtrl: ToastController, public loadCtrl : LoadingController) {
    this.key = this.navParams.get('key');
    this._jobservice.getJobBykey(this.key).then((res:any)=>{
      console.log(res);
      this.jobPost = res;
    })
  }


  updateJob(jobPost){
    let loader = this.loadCtrl.create({
      content: 'Please Wait'
    });

    loader.present();

    this._jobservice.updateJobBykey(this.key,jobPost).then((res:any)=>{
        loader.dismiss();
        if(res.success == true){
          this.navCtrl.pop();
        }
    }).catch((err)=>{
      loader.dismiss();
      this.presentToast(err);
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
