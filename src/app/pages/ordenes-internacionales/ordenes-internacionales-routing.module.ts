import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesInternacionalesPage } from './ordenes-internacionales.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesInternacionalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesInternacionalesPageRoutingModule {}
