import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdelantoViaticosPage } from './adelanto-viaticos.page';

const routes: Routes = [
  {
    path: '',
    component: AdelantoViaticosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdelantoViaticosPageRoutingModule {}
