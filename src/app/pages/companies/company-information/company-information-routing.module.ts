import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyInformationPage } from './company-information.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyInformationPageRoutingModule {}
