import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { PostEvents } from './../../module/events/events.interface';
import { Injectable } from '@angular/core';
import firebase from 'firebase'



/*
  Generated class for the EventsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EventsProvider {

  fireEvents = firebase.database().ref('/events');

  items = [];
  constructor(private afdb : AngularFireDatabase) {
  }


  postEvents(events:PostEvents){
    events.postedId = firebase.auth().currentUser.uid;
    let promise = new Promise((resolve,reject)=>{
      this.fireEvents.push(events).then(()=>{ resolve({success:true})}).catch((err)=>{ reject(err) })
    })

    return promise;
  }


  getCurrentUserRecord(){
    let events = this.afdb.list('/events/'+firebase.auth().currentUser.uid);
    return events;
  }

  getAllEvents():FirebaseListObservable<any[]>{
      let events = this.afdb.list('/events')
      return events;
  }

  getMyEvents():FirebaseListObservable<any[]>{
    return this.afdb.list('/events',{
      query:{
        orderByChild: 'postedId',
        equalTo:firebase.auth().currentUser.uid
      }
    });
  }





  deleteEventsByKey(key){
    this.afdb.list('/events').remove(key);
 }


 getEventsBykey(key){
  let promise =  new Promise((resolve,reject)=>{
    this.fireEvents.child(key).once('value',(snapshot)=>{
      resolve(snapshot.val())
    }).catch((err)=>{
      reject(err)
    })
  })

  return promise;
}

updateEventsBykey(key,events:PostEvents){
  let promise = new Promise((resolve,reject)=>{
    this.fireEvents.child(key).update(events).then(()=>{
      resolve({success:true});
    }).catch((err)=>{
      reject(err)
    })
  });
  return promise;
}

  // getEvents(){
  //   let allevents;
  //   let events = [];
  //   this.fireEvents.once('value',(snapshot)=>{
  //     allevents = snapshot.val();
  //     events = [];
  //       for(let i in allevents){
  //          events.push(i);
  //       }

  //       for(let j in events){
  //         this.items.push(j)
  //       }
  //   })


  // }

}
