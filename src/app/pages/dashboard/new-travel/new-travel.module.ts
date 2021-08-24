import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTravelPageRoutingModule } from './new-travel-routing.module';

import { NewTravelPage } from './new-travel.page';

import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NewTravelPageRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ],
  declarations: [NewTravelPage]
})
export class NewTravelPageModule {}
