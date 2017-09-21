import { FirebaseListObservable } from 'angularfire2/database';
import { JobserviceProvider } from './../../providers/jobservice/jobservice';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage,ActionSheetController} from 'ionic-angular';
import firebase from 'firebase'

/**
 * Generated class for the MyalertPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-myalert',
  templateUrl: 'myalert.html',
})
export class MyalertPage {
  items:FirebaseListObservable<any[]>
  currentUser = firebase.auth().currentUser.uid;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _jobservice: JobserviceProvider,public actionsheet : ActionSheetController) {
  }


  ionViewWillLoad(){
    this.items = this._jobservice.getMyJobs();
  }


  //shows an action sheet for delete and edit
  selectedAlert(item){
    this.actionsheet.create({
      title:'Options',
      buttons:[
        {
          text:'Edit',
          handler:()=>{
            //handels the edit option

            this.navCtrl.push("EditalertPage",{key:item.$key});
          }
        },
        {
          text:'Delete',
          role:'destructive',
          handler:()=>{
            //handels the delete option
            this._jobservice.deleteJobByKey(item.$key);
          }
        },
        {
          text:'Cancel',
          role:'cancel',
          handler:()=>{
            //responds to dismis the action sheet
          }
        }
      ]
    }).present();
  }

}
