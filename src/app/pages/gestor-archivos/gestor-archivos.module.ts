import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestorArchivosPageRoutingModule } from './gestor-archivos-routing.module';

import { GestorArchivosPage } from './gestor-archivos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestorArchivosPageRoutingModule,
    PipesModule
  ],
  declarations: [GestorArchivosPage]
})
export class GestorArchivosPageModule {}
