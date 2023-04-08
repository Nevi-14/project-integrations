import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndustriesPage } from './industries.page';

const routes: Routes = [
  {
    path: '',
    component: IndustriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndustriesPageRoutingModule {}
