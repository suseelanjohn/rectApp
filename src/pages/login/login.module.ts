import { LoginPage } from './login';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(LoginPage)],
  declarations:[LoginPage]
})

export class LoginModule { }
