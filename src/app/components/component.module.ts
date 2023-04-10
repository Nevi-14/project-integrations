import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts'
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PieChartComponent } from './dashboards/ng2-charts/pie-chart/pie-chart.component';;
import { FormsModule } from '@angular/forms';
import { BarChartComponent } from './dashboards/ng2-charts/bar-chart/bar-chart.component';
import { MapboxComponent } from './maps/mapbox/mapbox.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AngularCanlendarComponent } from './calendars/angular-canlendar/angular-canlendar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
 
@NgModule({
  declarations: [
    PieChartComponent,
    BarChartComponent,
    MapboxComponent,
    AngularCanlendarComponent,
    HeaderComponent,
    FooterComponent
  
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    NgChartsModule,
    FormsModule,
    NgChartsModule, CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
 
  ],
  exports: [
    PieChartComponent,
    BarChartComponent,
    MapboxComponent,
    AngularCanlendarComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class ComponentModule { }

