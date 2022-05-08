import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaProveedoresPageRoutingModule } from './lista-proveedores-routing.module';

import { ListaProveedoresPage } from './lista-proveedores.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaProveedoresPageRoutingModule,
    PipesModule
  ],
  declarations: [ListaProveedoresPage]
})
export class ListaProveedoresPageModule {}
