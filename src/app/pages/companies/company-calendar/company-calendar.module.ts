import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyCalendarPageRoutingModule } from './company-calendar-routing.module';

import { CompanyCalendarPage } from './company-calendar.page';
import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyCalendarPageRoutingModule,
    ComponentModule
  ],
  declarations: [CompanyCalendarPage]
})
export class CompanyCalendarPageModule {}
