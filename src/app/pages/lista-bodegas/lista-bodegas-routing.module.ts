import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaBodegasPage } from './lista-bodegas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaBodegasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaBodegasPageRoutingModule {}
