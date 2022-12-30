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
  },

  {
    path: 'ordenes-internacionales',
    loadChildren: () => import('./pages/ordenes-internacionales/ordenes-internacionales.module').then( m => m.OrdenesInternacionalesPageModule)
  },
  {
    path: 'lista-paises',
    loadChildren: () => import('./pages/lista-paises/lista-paises.module').then( m => m.ListaPaisesPageModule)
  },
  {
    path: 'orden-de-compra-detalle',
    loadChildren: () => import('./pages/orden-de-compra-detalle/orden-de-compra-detalle.module').then( m => m.OrdenDeCompraDetallePageModule)
  },
  {
    path: 'gestor-archivos',
    loadChildren: () => import('./pages/gestor-archivos/gestor-archivos.module').then( m => m.GestorArchivosPageModule)
  },
  {
    path: 'bulk',
    loadChildren: () => import('./pages/bulk/bulk.module').then( m => m.BulkPageModule)
  },
  {
    path: 'desalmacenaje',
    loadChildren: () => import('./pages/desalmacenaje/desalmacenaje.module').then( m => m.DesalmacenajePageModule)
  },




 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
