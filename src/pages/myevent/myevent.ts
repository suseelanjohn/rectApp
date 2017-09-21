import { EventsProvider } from './../../providers/events/events';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the MyeventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-myevent',
  templateUrl: 'myevent.html',
})
export class MyeventPage {

  items:FirebaseListObservable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams,private _events : EventsProvider,public actionsheet : ActionSheetController) {
    this.items =this._events.getMyEvents();
  }


  //actionsheet call
  selectedEvent(item){
    this.actionsheet.create({
        title:'Options',
        buttons:[
          {
            text:'Edit',
            handler:()=>{
              //handels the edit option
              this.navCtrl.push("EditeventPage",{key:item.$key})
            }
          },
          {
            text:'Delete',
            role:'destructive',
            handler:()=>{
              //handels the delete option
              this._events.deleteEventsByKey(item.$key);
            }
          },
          {
            text:'Cancel',
            role:'cancel',
            handler:()=>{
              //responce for actionsheet cancel
            }
          }

        ]
    }).present();
  }

}
