import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionOrdernesPageRoutingModule } from './gestion-ordernes-routing.module';

import { GestionOrdernesPage } from './gestion-ordernes.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionOrdernesPageRoutingModule,
    PipesModule
  ],
  declarations: [GestionOrdernesPage]
})
export class GestionOrdernesPageModule {}
