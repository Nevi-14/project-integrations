import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesalmacenajePage } from './desalmacenaje.page';

const routes: Routes = [
  {
    path: '',
    component: DesalmacenajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesalmacenajePageRoutingModule {}
