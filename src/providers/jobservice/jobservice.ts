import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { JobPost } from './../../module/job/job.interface';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


/*
  Generated class for the JobserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class JobserviceProvider {

  firedata = firebase.database().ref('jobalert');

  constructor(private angularFire: AngularFireAuth,private afdb:AngularFireDatabase) {

  }

  postJob(jobpost:JobPost){
    jobpost.postedId = this.angularFire.auth.currentUser.uid;
    jobpost.posteddate = new Date();
    let promise = new Promise((resolve,reject)=>{
        this.firedata.push(jobpost).then(()=>{ resolve({success:true})}).catch((err)=>{ reject(err) });
    })
    return promise;
  }



  getAllUserJob():FirebaseListObservable<any[]>{
    return this.afdb.list('/jobalert');
  }

  getMyJobs():FirebaseListObservable<any[]>{
    return this.afdb.list('/jobalert',{
      query:{
        orderByChild: 'postedId',
        equalTo:firebase.auth().currentUser.uid
      }
    });
  }

  deleteJobByKey(key){
     this.afdb.list('/jobalert').remove(key);
  }

  getJobBykey(key){
    let promise =  new Promise((resolve,reject)=>{
      this.firedata.child(key).once('value',(snapshot)=>{
        resolve(snapshot.val())
      }).catch((err)=>{
        reject(err)
      })
    })

    return promise;
  }

  updateJobBykey(key,jobpost:JobPost){
    let promise = new Promise((resolve,reject)=>{
      this.firedata.child(key).update(jobpost).then(()=>{
        resolve({success:true});
      }).catch((err)=>{
        reject(err)
      })
    });
    return promise;
  }

}
