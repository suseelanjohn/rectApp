import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(HomePage)],
  declarations:[HomePage]
})

export class HomeModule { }
