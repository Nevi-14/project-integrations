import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaBodegasPageRoutingModule } from './lista-bodegas-routing.module';

import { ListaBodegasPage } from './lista-bodegas.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaBodegasPageRoutingModule,
    PipesModule
  ],
  declarations: [ListaBodegasPage]
})
export class ListaBodegasPageModule {}
