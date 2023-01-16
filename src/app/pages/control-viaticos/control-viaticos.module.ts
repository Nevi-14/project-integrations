import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlViaticosPageRoutingModule } from './control-viaticos-routing.module';

import { ControlViaticosPage } from './control-viaticos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlViaticosPageRoutingModule
  ],
  declarations: [ControlViaticosPage]
})
export class ControlViaticosPageModule {}
