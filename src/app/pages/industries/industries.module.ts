import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndustriesPageRoutingModule } from './industries-routing.module';

import { IndustriesPage } from './industries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndustriesPageRoutingModule
  ],
  declarations: [IndustriesPage]
})
export class IndustriesPageModule {}
