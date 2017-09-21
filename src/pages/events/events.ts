import { EventsProvider } from './../../providers/events/events';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, PopoverController } from 'ionic-angular';


/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  items:FirebaseListObservable<any[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,private eventservice : EventsProvider ,private popoverCtrl: PopoverController) {
  }

  ionViewWillLoad(){
    this.items = this.eventservice.getAllEvents();
    //console.log("Events"+this.eventservice.getEvents());
  }


  presentPopover(event){
    let popover = this.popoverCtrl.create("PopoverPage");
    popover.present({
      ev: event
    });
  }


  chatroom(){
    this.navCtrl.push("ChatroomPage");
  }



  navigateToAddEvents(){
    this.navCtrl.push("AddeventPage");
  }



}
