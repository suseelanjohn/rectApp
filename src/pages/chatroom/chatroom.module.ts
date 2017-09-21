import { ChatroomPage } from './chatroom';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(ChatroomPage)],
  declarations:[ChatroomPage]
})

export class ChatroomModule { }
