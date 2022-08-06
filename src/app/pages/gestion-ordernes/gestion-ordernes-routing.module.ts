import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionOrdernesPage } from './gestion-ordernes.page';

const routes: Routes = [
  {
    path: '',
    component: GestionOrdernesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionOrdernesPageRoutingModule {}
