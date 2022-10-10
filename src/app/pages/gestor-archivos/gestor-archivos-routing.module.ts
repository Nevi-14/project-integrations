import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestorArchivosPage } from './gestor-archivos.page';

const routes: Routes = [
  {
    path: '',
    component: GestorArchivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestorArchivosPageRoutingModule {}
