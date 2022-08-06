import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [EncabezadoComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    EncabezadoComponent
  ]
})
export class ComponentModule { }

