import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPaisesPageRoutingModule } from './lista-paises-routing.module';

import { ListaPaisesPage } from './lista-paises.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPaisesPageRoutingModule,
    PipesModule
  ],
  declarations: [ListaPaisesPage]
})
export class ListaPaisesPageModule {}
