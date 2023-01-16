import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltrarGastosPageRoutingModule } from './filtrar-gastos-routing.module';

import { FiltrarGastosPage } from './filtrar-gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltrarGastosPageRoutingModule
  ],
  declarations: [FiltrarGastosPage]
})
export class FiltrarGastosPageModule {}
