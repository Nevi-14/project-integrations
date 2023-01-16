import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoCuentaPage } from './estado-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoCuentaPageRoutingModule {}
