import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProfilePageModule } from './pages/profile/profile.module';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'index',
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
  {
    path: 'avatars',
    loadChildren: () => import('./pages/avatars/avatars.module').then( m => m.AvatarsPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'industries',
    loadChildren: () => import('./pages/industries/industries.module').then( m => m.IndustriesPageModule)
  },
  {
    path: 'company-laning-page',
    loadChildren: () => import('./pages/company-laning-page/company-laning-page.module').then( m => m.CompanyLaningPagePageModule)
  },
  {
    path: 'company-builder',
    loadChildren: () => import('./pages/company-builder/company-builder.module').then( m => m.CompanyBuilderPageModule)
  },
  {
    path: 'company-builder-departments',
    loadChildren: () => import('./pages/company-builder-departments/company-builder-departments.module').then( m => m.CompanyBuilderDepartmentsPageModule)
  },
  {
    path: 'firebase-verification',
    loadChildren: () => import('./pages/firebase-verification/firebase-verification.module').then( m => m.FirebaseVerificationPageModule)
  },
  {
    path: 'company-information',
    loadChildren: () => import('./pages/companies/company-information/company-information.module').then( m => m.CompanyInformationPageModule)
  },
  {
    path: 'online-store',
    loadChildren: () => import('./pages/companies/online-store/online-store.module').then( m => m.OnlineStorePageModule)
  },
  {
    path: 'company-board',
    loadChildren: () => import('./pages/company-board/company-board.module').then( m => m.CompanyBoardPageModule)
  },
  {
    path: 'company-settings',
    loadChildren: () => import('./pages/companies/company-settings/company-settings.module').then( m => m.CompanySettingsPageModule)
  },
  {
    path: 'company-billing',
    loadChildren: () => import('./pages/companies/company-billing/company-billing.module').then( m => m.CompanyBillingPageModule)
  },
  {
    path: 'company-calendar',
    loadChildren: () => import('./pages/companies/company-calendar/company-calendar.module').then( m => m.CompanyCalendarPageModule)
  },
  {
    path: 'invoice-generator',
    loadChildren: () => import('./pages/invoice-generator/invoice-generator.module').then( m => m.InvoiceGeneratorPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./pages/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./pages/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'edit-product',
    loadChildren: () => import('./pages/edit-product/edit-product.module').then( m => m.EditProductPageModule)
  },
  {
    path: 'edit-customer',
    loadChildren: () => import('./pages/edit-customer/edit-customer.module').then( m => m.EditCustomerPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./pages/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'add-customer',
    loadChildren: () => import('./pages/add-customer/add-customer.module').then( m => m.AddCustomerPageModule)
  },
  {
    path: 'products-list',
    loadChildren: () => import('./pages/products-list/products-list.module').then( m => m.ProductsListPageModule)
  },
  {
    path: 'customers-list',
    loadChildren: () => import('./pages/customers-list/customers-list.module').then( m => m.CustomersListPageModule)
  },
  {
    path: 'invoice-details',
    loadChildren: () => import('./pages/invoice-details/invoice-details.module').then( m => m.InvoiceDetailsPageModule)
  },
  {
    path: 'add-signature',
    loadChildren: () => import('./pages/add-signature/add-signature.module').then( m => m.AddSignaturePageModule)
  },

  





 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
