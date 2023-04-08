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
        redirectTo: '/home/companies/company-board',
        pathMatch: 'full'
      },
      {
        path: 'companies/project-info',
        loadChildren: () => import('../companies/project-info/project-info.module').then( m => m.ProjectInfoPageModule)
      },
      {
        path: 'companies/company-board',
        loadChildren: () => import('../company-board/company-board.module').then( m => m.CompanyBoardPageModule)
      },
      {
       path: 'companies/users',
       loadChildren: () => import('../companies/users/users.module').then( m => m.UsersPageModule)
     },
       {
        path: 'companies/customers',
        loadChildren: () => import('../companies/customers/customers.module').then( m => m.CustomersPageModule)
      },
      {
        path: 'companies/departments',
        loadChildren: () => import('../companies/departments/departments.module').then( m => m.DepartmentsPageModule)
      },
       {
        path: 'companies/products',
        loadChildren: () => import('../companies/products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'companies/invoices',
        loadChildren: () => import('../companies/invoices/invoices.module').then( m => m.InvoicesPageModule)
      },
      {
        path: 'companies/company-settings',
        loadChildren: () => import('../companies/company-settings/company-settings.module').then( m => m.CompanySettingsPageModule)
      },
      {
        path: 'companies/company-calendar',
        loadChildren: () => import('../companies/company-calendar/company-calendar.module').then( m => m.CompanyCalendarPageModule)
      },
      {
        path: 'companies/company-billing',
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
