import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyLaningPagePage } from './company-laning-page.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyLaningPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyLaningPagePageRoutingModule {}
