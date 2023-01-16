import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdelantoViaticosPageRoutingModule } from './adelanto-viaticos-routing.module';

import { AdelantoViaticosPage } from './adelanto-viaticos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdelantoViaticosPageRoutingModule
  ],
  declarations: [AdelantoViaticosPage]
})
export class AdelantoViaticosPageModule {}
