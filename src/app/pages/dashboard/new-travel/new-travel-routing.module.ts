import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTravelPage } from './new-travel.page';

const routes: Routes = [
  {
    path: '',
    component: NewTravelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTravelPageRoutingModule {}
