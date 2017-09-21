import { RequestserviceProvider } from './../../providers/requestservice/requestservice';
import { connectionreq } from './../../module/reqest/request.interface';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,IonicPage } from 'ionic-angular';
import firebase from 'firebase';



/**
 * Generated class for the FriendlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-friendlist',
  templateUrl: 'friendlist.html',
})
export class FriendlistPage {

  newreq = {} as connectionreq;
  userData = [];
  temparr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private userservice:UserProvider,public alertCtrl : AlertController,private requestservice : RequestserviceProvider) {

  }

  ionViewWillEnter() {
    this.userservice.getAlluserDetails().then((res:any)=>{
      this.userData = res;
      this.temparr =res;
    })
  }

  getItems(ev:any){
    this.userData = this.temparr;
    // set val to the value of the searchbar
    let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.userData = this.userData.filter((item) => {
            return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }

  }

  sendreq(recipiant){
    this.newreq.sender = firebase.auth().currentUser.uid;
    this.newreq.reciver = recipiant.uid;
    if(this.newreq.sender == this.newreq.reciver){
      alert('You are your friend always');
    }else{
      let successalert = this.alertCtrl.create({
          title:'Request sent',
          subTitle:'Your reuest was sent to '+recipiant.displayName,
          buttons:['ok']
      })


    this.requestservice.sendrequest(this.newreq).then((res:any)=>{
      if(res.success){
        successalert.present();
        let sentuser = this.userData.indexOf(recipiant);
        this.userData.splice(sentuser,1);
      }
    }).catch((err)=>{
      alert(err)
    })
    }

  }

}
