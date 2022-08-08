import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPaisesPage } from './lista-paises.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPaisesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPaisesPageRoutingModule {}
