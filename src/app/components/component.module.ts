import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';



@NgModule({
  declarations: [EncabezadoComponent,MapaComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    EncabezadoComponent,MapaComponent
  ]
})
export class ComponentModule { }

