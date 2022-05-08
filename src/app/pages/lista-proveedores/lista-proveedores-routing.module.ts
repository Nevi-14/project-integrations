import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaProveedoresPage } from './lista-proveedores.page';

const routes: Routes = [
  {
    path: '',
    component: ListaProveedoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaProveedoresPageRoutingModule {}
