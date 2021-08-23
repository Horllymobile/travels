import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTravelPageRoutingModule } from './new-travel-routing.module';

import { NewTravelPage } from './new-travel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTravelPageRoutingModule
  ],
  declarations: [NewTravelPage]
})
export class NewTravelPageModule {}
