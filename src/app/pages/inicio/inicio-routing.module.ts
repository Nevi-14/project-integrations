import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children:[
      {
        path: '',
        redirectTo: '/inicio/detalle',
        pathMatch: 'full'
      },
      {
        path: 'detalle',
        loadChildren: () => import('../detalle/detalle.module').then( m => m.DetallePageModule)
      },
       {
        path: 'dashboard-compras-en-linea',
        loadChildren: () => import('../dashboard-compras-en-linea/dashboard-compras-en-linea.module').then( m => m.DashboardComprasEnLineaPageModule)
      },
      {
        path: 'gestion-ordernes',
        loadChildren: () => import('../gestion-ordernes/gestion-ordernes.module').then( m => m.GestionOrdernesPageModule)
      },
    ]
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
