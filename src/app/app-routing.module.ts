import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'lista-proveedores',
    loadChildren: () => import('./pages/lista-proveedores/lista-proveedores.module').then( m => m.ListaProveedoresPageModule)
  },
  {
    path: 'lista-articulos',
    loadChildren: () => import('./pages/lista-articulos/lista-articulos.module').then( m => m.ListaArticulosPageModule)
  },
  {
    path: 'lista-bodegas',
    loadChildren: () => import('./pages/lista-bodegas/lista-bodegas.module').then( m => m.ListaBodegasPageModule)
  },
  {
    path: 'calendario-popover',
    loadChildren: () => import('./pages/calendario-popover/calendario-popover.module').then( m => m.CalendarioPopoverPageModule)
  },
  {
    path: 'ordenes-de-compra',
    loadChildren: () => import('./pages/ordenes-de-compra/ordenes-de-compra.module').then( m => m.OrdenesDeCompraPageModule)
  },  {
    path: 'formulario-compras-internacionales',
    loadChildren: () => import('./pages/formulario-compras-internacionales/formulario-compras-internacionales.module').then( m => m.FormularioComprasInternacionalesPageModule)
  },
  {
    path: 'ordenes-internacionales',
    loadChildren: () => import('./pages/ordenes-internacionales/ordenes-internacionales.module').then( m => m.OrdenesInternacionalesPageModule)
  },
  {
    path: 'lista-paises',
    loadChildren: () => import('./pages/lista-paises/lista-paises.module').then( m => m.ListaPaisesPageModule)
  },



 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
