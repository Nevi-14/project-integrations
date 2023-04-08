import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyCalendarPage } from './company-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyCalendarPageRoutingModule {}
