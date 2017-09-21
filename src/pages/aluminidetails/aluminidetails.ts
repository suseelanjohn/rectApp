import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the AluminidetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({})
@Component({
  selector: 'page-aluminidetails',
  templateUrl: 'aluminidetails.html',
})
export class AluminidetailsPage {

 userData = [];
 temparr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private userservice : UserProvider) {

  }




  getItems(ev: any) {
    this.userData = this.temparr;
    // Reset items back to all of the items
    console.log(this.userData);


    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.userData = this.userData.filter((item) => {
        return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  itemSelected(item:any){

    this.navCtrl.push("ListdetailsPage",{
      "name":item.displayName,
      "photoURL":item.photoURL,
      "email":item.email,
      "phone":item.phone,
      "isphoneVisible":item.isphoneVisible,
      "dob":item.dob,
      "maritial":item.marital,
      "bloodgroup":item.bloodgroup,
      "dept":item.dept,
      "genid":item.gender,
      "passout":item.passout,
      "employeetype":item.employeType,
      "cname":item.compnayName,
      "crole":item.role,
      "clocation":item.location
      });
  }

  ionViewWillEnter() {

    this.userservice.getAlluserDetails().then((res:any)=>{
      this.userData = res;
      this.temparr =res;
    })


  }

}
