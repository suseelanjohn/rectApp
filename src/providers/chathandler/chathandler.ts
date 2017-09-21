import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the ChathandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChathandlerProvider {

  firebasechat = firebase.database().ref('/chats');
  chatter:any;
  messages = [];
  constructor(public events:Events) {

  }


  initializeChat(chatter){
    this.chatter = chatter;
  }

  addnewMessage(msg){
    if(this.chatter){
      let promise = new Promise((resolve,reject)=>{
        this.firebasechat.child(firebase.auth().currentUser.uid).child(this.chatter.uid).push({
          sentby:firebase.auth().currentUser.uid,
          message:msg,
          timestamp:firebase.database.ServerValue.TIMESTAMP
        }).then(()=>{
          this.firebasechat.child(this.chatter.uid).child(firebase.auth().currentUser.uid).push({
            sentby:firebase.auth().currentUser.uid,
            message:msg,
            timestamp:firebase.database.ServerValue.TIMESTAMP
          }).then(()=>{
            resolve({success:true})
          }).catch((err)=>{
            reject(err)
          })
        })
      })

      return promise;
    }
  }




  getbuddymessages() {

    let temp;
    this.firebasechat.child(firebase.auth().currentUser.uid).child(this.chatter.uid).on('value', (snapshot) => {
      this.messages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.messages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

}
