import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesDeCompraPageRoutingModule } from './ordenes-de-compra-routing.module';

import { OrdenesDeCompraPage } from './ordenes-de-compra.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenesDeCompraPageRoutingModule,
    PipesModule
  ],
  declarations: [OrdenesDeCompraPage]
})
export class OrdenesDeCompraPageModule {}
