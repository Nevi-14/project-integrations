import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import Chart from 'chart.js/auto';
import { DashboardPage } from './dashboard.page';
// installing dashboard
import { NgChartsModule } from 'ng2-charts';
// https://www.udemy.com/course/angular-fernando-herrera/learn/lecture/24268852#overview
//  https://valor-software.com/ng2-charts/


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    NgChartsModule
  ],
  declarations: [DashboardPage],
 
})
export class DashboardPageModule {}
