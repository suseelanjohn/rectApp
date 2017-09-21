import { JobserviceProvider } from './../../providers/jobservice/jobservice';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, IonicPage } from 'ionic-angular';
import { JobPost } from '../../module/job/job.interface';

/**
 * Generated class for the AddjobPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-addjob',
  templateUrl: 'addjob.html',
})
export class AddjobPage {

  jobPost = {} as JobPost;

  constructor(public navCtrl: NavController, public navParams: NavParams,private jobservice:JobserviceProvider,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) {

  }



  postJob(){
    let loader = this.loadingCtrl.create({
      content: 'Please Wait'
    });

    loader.present();

    this.jobservice.postJob(this.jobPost).then((res:any)=>{
        loader.dismiss();
        if(res.success){
          this.jobPost.jobTitle = "";
          this.jobPost.jobDiscription = "";
          this.jobPost.companyName = "";
          this.jobPost.location = "";
          this.jobPost.phoneNumber = "";
          this.jobPost.email = "";
          this.jobPost.numberofvacancy = "";
          this.jobPost.experience = "";
          this.jobPost.skills = "";
          this.presentToast('Job alert added successfully');
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
