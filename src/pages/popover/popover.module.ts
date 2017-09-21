import { PopoverPage } from './popover';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(PopoverPage)],
  declarations:[PopoverPage]
})

export class PopoverModule { }
