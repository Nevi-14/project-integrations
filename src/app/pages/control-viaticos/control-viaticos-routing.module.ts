import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlViaticosPage } from './control-viaticos.page';

const routes: Routes = [
  {
    path: '',
    component: ControlViaticosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlViaticosPageRoutingModule {}
