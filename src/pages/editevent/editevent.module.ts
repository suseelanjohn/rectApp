import { IonicPageModule } from 'ionic-angular';
import { EditeventPage } from './editevent';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(EditeventPage)],
  declarations:[EditeventPage]
})

export class EditeventModule{}
