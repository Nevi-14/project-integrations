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
        path: 'company-board',
        loadChildren: () => import('../company-board/company-board.module').then( m => m.CompanyBoardPageModule)
      },
      {
       path: 'users',
       loadChildren: () => import('../users/users.module').then( m => m.UsersPageModule)
     },
       {
        path: 'customers',
        loadChildren: () => import('../companies/customers/customers.module').then( m => m.CustomersPageModule)
      },
      {
        path: 'departments',
        loadChildren: () => import('../companies/departments/departments.module').then( m => m.DepartmentsPageModule)
      },
       {
        path: 'products',
        loadChildren: () => import('../products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'invoices',
        loadChildren: () => import('../invoices/invoices.module').then( m => m.InvoicesPageModule)
      },
      {
        path: 'company-settings',
        loadChildren: () => import('../companies/company-settings/company-settings.module').then( m => m.CompanySettingsPageModule)
      },
      {
        path: 'company-calendar',
        loadChildren: () => import('../companies/company-calendar/company-calendar.module').then( m => m.CompanyCalendarPageModule)
      },
      {
        path: 'company-billing',
        loadChildren: () => import('../companies/company-billing/company-billing.module').then( m => m.CompanyBillingPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },    
    ]
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
