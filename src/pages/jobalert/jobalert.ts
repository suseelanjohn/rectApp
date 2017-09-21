import {FirebaseListObservable } from 'angularfire2/database';
import { JobserviceProvider } from './../../providers/jobservice/jobservice';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, PopoverController } from 'ionic-angular';



/**
 * Generated class for the JobalertPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-jobalert',
  templateUrl: 'jobalert.html',
})
export class JobalertPage {
  items:FirebaseListObservable<any[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,public         jobservice:JobserviceProvider,private popoverCtrl: PopoverController) {

  }

  presentPopover(event){
    let popover = this.popoverCtrl.create("PopoverPage");
    popover.present({
      ev: event
    });
  }


  navigateToAddJob(){
    this.navCtrl.push("AddjobPage");
  }


  ionViewWillLoad(){
    this.items = this.jobservice.getAllUserJob();
  }



  chatroom(){
    this.navCtrl.push("ChatroomPage");
  }


}
