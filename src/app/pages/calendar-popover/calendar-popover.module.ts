import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPopoverPageRoutingModule } from './calendar-popover-routing.module';

import { CalendarPopoverPage } from './calendar-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPopoverPageRoutingModule
  ],
  declarations: [CalendarPopoverPage]
})
export class CalendarPopoverPageModule {}
