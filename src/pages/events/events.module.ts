import { PipesModule } from './../../pipes/pipes.module';
import { EventsPage } from './events';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
@NgModule({
  imports:[IonicPageModule.forChild(EventsPage),
    PipesModule],
  declarations:[EventsPage]
})

export class EventsModule{ }
