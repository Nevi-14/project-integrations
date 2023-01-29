import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PieChartPageRoutingModule } from './pie-chart-routing.module';

import { PieChartPage } from './pie-chart.page';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PieChartPageRoutingModule,
    NgChartsModule
  ],
  declarations: [PieChartPage]
})
export class PieChartPageModule {}
