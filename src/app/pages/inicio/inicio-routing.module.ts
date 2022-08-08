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
        path: 'compras-internacionales',
        loadChildren: () => import('../compras-internacionales/compras-internacionales.module').then( m => m.ComprasInternacionalesPageModule)
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
