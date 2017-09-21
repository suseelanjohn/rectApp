import { ProfilePage } from './profile';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(ProfilePage)],
  declarations:[ProfilePage]
})

export class ProfileModule { }
