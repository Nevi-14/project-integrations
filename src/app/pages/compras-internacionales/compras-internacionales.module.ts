import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprasInternacionalesPageRoutingModule } from './compras-internacionales-routing.module';

import {ComprasInternacionalesPage } from './compras-internacionales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprasInternacionalesPageRoutingModule
  ],
  declarations: [ComprasInternacionalesPage]
})
export class ComprasInternacionalesPageModule {}
