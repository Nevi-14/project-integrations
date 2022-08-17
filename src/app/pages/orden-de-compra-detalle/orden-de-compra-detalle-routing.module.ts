import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenDeCompraDetallePage } from './orden-de-compra-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenDeCompraDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenDeCompraDetallePageRoutingModule {}
