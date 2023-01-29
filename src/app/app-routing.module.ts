import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProfilePageModule } from './pages/profile/profile.module';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'calendar-popover',
    loadChildren: () => import('./pages/calendar-popover/calendar-popover.module').then( m => m.CalendarPopoverPageModule)
  },

  {
    path: 'log-in',
    loadChildren: () => import('./pages/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad:[AuthGuard]
  },



 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
