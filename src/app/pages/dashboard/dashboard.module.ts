import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { DashboardPage } from './dashboard.page';
import { ComponentModule } from 'src/app/components/component.module';
 
 
// installing dashboard
// https://www.udemy.com/course/angular-fernando-herrera/learn/lecture/24268852#overview
//  https://valor-software.com/ng2-charts/


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    NgChartsModule,
    ComponentModule
  ],
  declarations: [DashboardPage],
 
})
export class DashboardPageModule {}
