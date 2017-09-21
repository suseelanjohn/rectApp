import { IonicPageModule } from 'ionic-angular';
import { EditstatusPage } from './editstatus';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(EditstatusPage)],
  declarations:[EditstatusPage]
})

export class EditstatusModule{}
