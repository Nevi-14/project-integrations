import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaArticulosPageRoutingModule } from './lista-articulos-routing.module';

import { ListaArticulosPage } from './lista-articulos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaArticulosPageRoutingModule,
    PipesModule
  ],
  declarations: [ListaArticulosPage]
})
export class ListaArticulosPageModule {}
