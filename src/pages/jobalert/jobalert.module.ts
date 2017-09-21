import { PipesModule } from './../../pipes/pipes.module';
import { JobalertPage } from './jobalert';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(JobalertPage),
  PipesModule],
  declarations:[JobalertPage]
})

export class JobalertModule { }
