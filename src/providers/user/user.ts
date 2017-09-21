import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';


import  firebase  from 'firebase';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

 firedata = firebase.database().ref('/rectuser')

  constructor(public angularAuth: AngularFireAuth) {

  }

  adduser(newUser){
      let promise = new Promise((resolve,reject)=>{
          this.angularAuth.auth.createUserWithEmailAndPassword(newUser.email,newUser.password).then(()=>{
            this.angularAuth.auth.currentUser.updateProfile({
                displayName:newUser.userName,
                photoURL:'https://firebasestorage.googleapis.com/v0/b/rectapp-5dfb1.appspot.com/o/boy.png?alt=media&token=80cd8a81-e1ad-4915-a1b3-a306e1c4e7bd'
            }).then(()=>{
                this.firedata.child(this.angularAuth.auth.currentUser.uid).set({
                    uid :this.angularAuth.auth.currentUser.uid,
                    displayName:newUser.username,
                    photoURL:'https://firebasestorage.googleapis.com/v0/b/rectapp-5dfb1.appspot.com/o/boy.png?alt=media&token=80cd8a81-e1ad-4915-a1b3-a306e1c4e7bd',
                    email:newUser.email,
                    dob:newUser.myDate,
                    gender:newUser.gender,
                    bloodgroup:'',
                    phone:'',
                    isphoneVisible:'1',
                    marital:'',
                    dept:'',
                    passout:'',
                    employeType:'',
                    compnayName:'',
                    role:'',
                    location:'',
                    status:'Proved to be an rectician',
                })
            }).then(()=>{
              resolve({success:true});
            }).catch((err)=>{
              reject (err);
            })
          }).catch((err)=>{
              reject(err);
          })
      })


      return promise;
  }


  getUserDetails(){
    let promise =  new Promise((resolve,reject)=>{
      this.firedata.child(firebase.auth().currentUser.uid).once('value',(snapshot)=>{
        resolve(snapshot.val())
      }).catch((err)=>{
        reject(err)
      })
    })

    return promise;

  }

  passwordResetEmail(email:string){
        let promise = new Promise((resolve,reject)=>{
            firebase.auth().sendPasswordResetEmail(email).then(()=>{
                resolve({success:true});
            }).catch((err)=>{
              reject(err);
            })
        })

        return promise;
  }

  updateimage(imageurl){
    var promise = new Promise((resolve, reject) => {
      this.angularAuth.auth.currentUser.updateProfile({
          displayName: this.angularAuth.auth.currentUser.displayName,
          photoURL: imageurl
      }).then(() => {
          firebase.database().ref('/rectuser/' + firebase.auth().currentUser.uid).update({
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
          }).then(() => {
              resolve({ success: true });
              }).catch((err) => {
                  reject(err);
              })
      }).catch((err) => {
            reject(err);
         })
  })
  return promise;
  }


  updateUser(userData){
      let promise = new Promise((resolve,reject)=>{
        firebase.database().ref('/rectuser/'+firebase.auth().currentUser.uid).update({
          displayName:userData.displayName,
          email:userData.email,
          dob:userData.dob,
          gender:userData.genid,
          bloodgroup:userData.bloodgroup,
          phone:userData.phone,
          isphoneVisible:userData.isphoneVisible,
          marital:userData.maritial,
          dept:userData.dept,
          passout:userData.passout,
          employeType:userData.employeetype,
          compnayName:userData.cname,
          role:userData.crole,
          location:userData.clocation
        }).then(()=>{
          resolve({success:true})
        }).catch((err)=>{
          reject(err)
        })
      })

      return promise;
  }


  updatestatus(userstatus){
    let promise = new Promise((resolve,reject)=>{
      firebase.database().ref('/rectuser/'+firebase.auth().currentUser.uid).update({
        status:userstatus
      }).then(()=>{
        resolve({success:true})
      }).catch((err)=>{
        reject(err)
      })
    })

    return promise;
  }


  getAlluserDetails(){
    let promise = new Promise((resolve,rejsect)=>{
      this.firedata.orderByChild('uid').once('value',(snapshot)=>{
          let userData = snapshot.val();
          let tempArr = [];
          for(let key in userData){
            tempArr.push(userData[key]);
          }
          resolve(tempArr);
      }).catch((err)=>{
        rejsect(err)
      })
    })

    return promise;
  }

}
