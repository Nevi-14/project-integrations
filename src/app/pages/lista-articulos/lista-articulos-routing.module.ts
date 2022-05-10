import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaArticulosPage } from './lista-articulos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaArticulosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaArticulosPageRoutingModule {}
