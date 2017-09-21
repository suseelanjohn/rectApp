import { SignupPage } from './signup';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(SignupPage)],
  declarations:[SignupPage]
})

export class SignupModule { }
