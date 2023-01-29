import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { ProfilePageModule } from '../profile/profile.module';

 

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: '',
        redirectTo: '/home/project-info',
        pathMatch: 'full'
      },
      {
        path: 'project-info',
        loadChildren: () => import('../project-info/project-info.module').then( m => m.ProjectInfoPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'dashboards',
        loadChildren: () => import('../../dashboards/dashboards.module').then( m => m.DashboardsModule)
      }
    ]
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
