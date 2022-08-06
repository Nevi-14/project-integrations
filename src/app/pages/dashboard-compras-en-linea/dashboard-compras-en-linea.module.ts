import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardComprasEnLineaPageRoutingModule } from './dashboard-compras-en-linea-routing.module';

import { DashboardComprasEnLineaPage } from './dashboard-compras-en-linea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardComprasEnLineaPageRoutingModule
  ],
  declarations: [DashboardComprasEnLineaPage]
})
export class DashboardComprasEnLineaPageModule {}
