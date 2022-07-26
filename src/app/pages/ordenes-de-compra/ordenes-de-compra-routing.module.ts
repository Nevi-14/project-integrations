import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesDeCompraPage } from './ordenes-de-compra.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesDeCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesDeCompraPageRoutingModule {}
