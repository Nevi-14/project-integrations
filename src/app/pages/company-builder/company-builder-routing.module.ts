import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyBuilderPage } from './company-builder.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyBuilderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyBuilderPageRoutingModule {}
