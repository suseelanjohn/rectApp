import { FriendlistPage } from './friendlist';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(FriendlistPage)],
  declarations:[FriendlistPage]
})

export class FriendListModule { }
