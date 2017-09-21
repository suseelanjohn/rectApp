import { EventsProvider } from './../../providers/events/events';
import { PostEvents } from './../../module/events/events.interface';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController, LoadingController } from 'ionic-angular';
/**
 * Generated class for the EditeventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-editevent',
  templateUrl: 'editevent.html',
})
export class EditeventPage {

  evets = {} as PostEvents;
  key:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _events : EventsProvider,public toastCtrl: ToastController, public loadCtrl: LoadingController) {
    this.key = this.navParams.get('key');
    this._events.getEventsBykey(this.key).then((res:any)=>{
      this.evets = res;
    })
  }

  updateEvent(evets){
    let loader = this.loadCtrl.create({
      content: 'Please Wait'
    });

    loader.present();

    this._events.updateEventsBykey(this.key,evets).then((res:any)=>{
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
