import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenDeCompraDetallePageRoutingModule } from './orden-de-compra-detalle-routing.module';

import { OrdenDeCompraDetallePage } from './orden-de-compra-detalle.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenDeCompraDetallePageRoutingModule,
    PipesModule
  ],
  declarations: [OrdenDeCompraDetallePage]
})
export class OrdenDeCompraDetallePageModule {}
