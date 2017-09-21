import { UserProvider } from './../user/user';
import { connectionreq } from './../../module/reqest/request.interface';
import { Injectable } from '@angular/core';
import {Events} from 'ionic-angular';
import firebase from 'firebase';


/*
  Generated class for the RequestserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RequestserviceProvider {
  firereq = firebase.database().ref('/request');
  firefriend = firebase.database().ref('/friends');
  userDetails;
  myfriends;
  constructor(private userservice : UserProvider,private events : Events) {

  }


  sendrequest(req:connectionreq){
    let promise = new Promise((resolve,reject)=>{
        this.firereq.child(req.reciver).push({
            sender:req.sender
        }).then(()=>{
          resolve({success:true})
          }).catch((err)=>{
            reject(err)
        })
    })

    return promise;
  }


  getmyrequest(){
    let allrequest;
    let myreq = [];
    this.firereq.child(firebase.auth().currentUser.uid).once('value',(snapshot)=>{
      allrequest = snapshot.val();
      myreq = [];
      for(let i in allrequest){
        myreq.push(allrequest[i].sender);
      }
      this.userservice.getAlluserDetails().then((res)=>{
        var alluser = res;
        this.userDetails = [];
        for(var j in myreq)
          for(var key in alluser){
            if(myreq[j] === alluser[key].uid){
              this.userDetails.push(alluser[key]);
            }
          }
          this.events.publish('gotrequest');
      })
    })
  }

  acceptrequest(recipiant){
      let promise = new Promise((resolve,reject)=>{
          this.firefriend.child(firebase.auth().currentUser.uid).push({
            uid:recipiant.uid
          }).then(()=>{
            this.firefriend.child(recipiant.uid).push({
              uid:firebase.auth().currentUser.uid
            }).then(()=>{
              this.deleterequest(recipiant).then(()=>{
                resolve({success:true})
              }).catch((err)=>{
                reject(err);
              })
            }).catch((err)=>{
              reject(err);
            })
          }).catch((err)=>{
            reject(err);
          })
      })

      return promise;
  }

  deleterequest(recipiant){
    let promise = new Promise((resolve,reject)=>{
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(recipiant.uid).once('value',(snapshot)=>{
        let tempstore = snapshot.val();
        let somekey = Object.keys(tempstore);
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey[0]).remove().then(()=>{
          resolve({success:true})
        }).catch((err)=>{
          reject(err)
        })
      }).catch((err)=>{
        reject(err)
      })
    })

    return promise;
  }

  getmyfriends(){
    let friedsuid = [];
    this.firefriend.child(firebase.auth().currentUser.uid).on('value',(snapshot)=>{
      let allfriends = snapshot.val();
      for(var i in allfriends){
        friedsuid.push(allfriends[i].uid)
      }

        this.userservice.getAlluserDetails().then((users)=>{
          this.myfriends = [];
          for(var j in friedsuid){
              for(var key in users){
                if(friedsuid[j] === users[key].uid){
                  this.myfriends.push(users[key]);
                }
              }
          }
          this.events.publish('friends');

    }).catch((err)=>{
        alert(err)
    });
  })
  }


}
