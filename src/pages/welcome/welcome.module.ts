import { WelcomePage } from './welcome';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';


@NgModule({
  imports:[
    IonicPageModule.forChild(WelcomePage)
  ],
  declarations:[WelcomePage]
})

export class WelcomeModule { }
