import { FIREBASE_CONFIG } from './firebase.config';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:string;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp(FIREBASE_CONFIG);
    const subscribe = firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        this.rootPage ="WelcomePage";
        subscribe();
      }else{
        this.rootPage = "HomePage";
        subscribe();
      }
    })



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#ac0000');
    });
  }


}

