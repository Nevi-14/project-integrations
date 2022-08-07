import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioComprasInternacionalesPageRoutingModule } from './formulario-compras-internacionales-routing.module';

import { FormularioComprasInternacionalesPage } from './formulario-compras-internacionales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioComprasInternacionalesPageRoutingModule
  ],
  declarations: [FormularioComprasInternacionalesPage]
})
export class FormularioComprasInternacionalesPageModule {}
