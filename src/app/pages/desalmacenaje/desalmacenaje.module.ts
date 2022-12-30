import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesalmacenajePageRoutingModule } from './desalmacenaje-routing.module';

import { DesalmacenajePage } from './desalmacenaje.page';
import { PipesModule } from 'src/app/pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesalmacenajePageRoutingModule,
    PipesModule
  ],
  declarations: [DesalmacenajePage]
})
export class DesalmacenajePageModule {}
