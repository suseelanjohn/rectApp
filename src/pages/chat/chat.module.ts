import { ChatPage } from './chat';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(ChatPage)],
  declarations:[ChatPage]
})

export class ChatModule { }
