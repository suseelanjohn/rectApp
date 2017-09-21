import { PipesModule } from './../../pipes/pipes.module';
import { IonicPageModule } from 'ionic-angular';
import { MyeventPage } from './myevent';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(MyeventPage),
  PipesModule],
  declarations:[MyeventPage]
})

export class MyeventModule {}
