import { WallPage } from './wall';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(WallPage)],
  declarations:[WallPage]
})

export class WallModule { }
