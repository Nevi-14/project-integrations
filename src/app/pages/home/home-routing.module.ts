import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';


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
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
       path: 'users',
       loadChildren: () => import('../users/users.module').then( m => m.UsersPageModule)
     },
       {
        path: 'customers',
        loadChildren: () => import('../customers/customers.module').then( m => m.CustomersPageModule)
      },
       {
        path: 'products',
        loadChildren: () => import('../products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'invoices',
        loadChildren: () => import('../invoices/invoices.module').then( m => m.InvoicesPageModule)
      } ,
      {
        path: 'invoice-generator',
        loadChildren: () => import('../invoice-generator/invoice-generator.module').then( m => m.InvoiceGeneratorPageModule)
      }    
    ]
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
