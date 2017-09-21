import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';


let apiUrl = 'http://rect.digitalbuddy.info/api/';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http,
  private fireauth:AngularFireAuth) {
  }


  signIn(userData){
    let promise = new Promise((resolve,reject)=>{
      this.fireauth.auth.signInWithEmailAndPassword(userData.useremail,userData.password).then(()=>{
        resolve(true);
      }).catch((err)=>{
        reject(err)
      })
    })

    return promise;
  }


  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }

}
