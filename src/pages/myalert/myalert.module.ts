import { PipesModule } from './../../pipes/pipes.module';
import { IonicPageModule } from 'ionic-angular';
import { MyalertPage } from './myalert';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(MyalertPage),
  PipesModule],
  declarations:[MyalertPage]
})

export class MyalertModule{

}
