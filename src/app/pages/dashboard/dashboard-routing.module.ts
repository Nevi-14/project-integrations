import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';

 
const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children:[
      {
        path: '',
        redirectTo: '/home/dashboard/pie-chart',
        pathMatch: 'full'
      },
      {
        path: 'pie-chart',
        loadChildren: () => import('./types/pie-chart/pie-chart.module').then( m => m.PieChartPageModule)
      },
      {
        path: 'bar-chart',
        loadChildren: () => import('./types/bar-chart/bar-chart.module').then( m => m.BarChartPageModule)
      },
      {
        path: 'line-chart',
        loadChildren: () => import('./types/line-chart/line-chart.module').then( m => m.LineChartPageModule)
      }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
