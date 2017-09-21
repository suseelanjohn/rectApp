import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  tab1:string = "WallPage";
  tab2:string = "EventsPage";
  tab3:string = "JobalertPage";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
