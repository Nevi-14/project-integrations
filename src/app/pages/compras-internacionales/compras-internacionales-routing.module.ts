import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprasInternacionalesPage } from './compras-internacionales.page';

const routes: Routes = [
  {
    path: '',
    component: ComprasInternacionalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprasInternacionalesPageRoutingModule {}
