import { EventsProvider } from './../../providers/events/events';
import { PostEvents } from './../../module/events/events.interface';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, IonicPage } from 'ionic-angular';

/**
 * Generated class for the AddeventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-addevent',
  templateUrl: 'addevent.html',
})
export class AddeventPage {

  evets = {} as PostEvents;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl : LoadingController,private eventservice : EventsProvider,
  public toastCtrl: ToastController) {
  }



  postEvent(){
    let loader = this.loadingCtrl.create({
      content: 'Please Wait'
    });

    loader.present();


    this.eventservice.postEvents(this.evets).then((res:any)=>{
      loader.dismiss();
      if(res.success){

        this.evets.title ="";
        this.evets.venue ="";
        this.evets.des = "";
        this.evets.startTime ="";
        this.evets.endTime ="";
        this.presentToast('Event added successfully');

      }
  }).catch((err)=>{
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
