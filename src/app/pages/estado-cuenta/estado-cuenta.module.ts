import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoCuentaPageRoutingModule } from './estado-cuenta-routing.module';

import { EstadoCuentaPage } from './estado-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoCuentaPageRoutingModule
  ],
  declarations: [EstadoCuentaPage]
})
export class EstadoCuentaPageModule {}
