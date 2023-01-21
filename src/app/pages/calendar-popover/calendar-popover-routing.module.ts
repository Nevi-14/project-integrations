import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarPopoverPage } from './calendar-popover.page';



const routes: Routes = [
  {
    path: '',
    component: CalendarPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarPopoverPageRoutingModule {}
