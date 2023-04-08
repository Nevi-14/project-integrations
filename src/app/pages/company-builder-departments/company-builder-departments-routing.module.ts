import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyBuilderDepartmentsPage } from './company-builder-departments.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyBuilderDepartmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyBuilderDepartmentsPageRoutingModule {}
