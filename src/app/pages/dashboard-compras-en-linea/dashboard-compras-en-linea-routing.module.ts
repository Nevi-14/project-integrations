import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComprasEnLineaPage } from './dashboard-compras-en-linea.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardComprasEnLineaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardComprasEnLineaPageRoutingModule {}
