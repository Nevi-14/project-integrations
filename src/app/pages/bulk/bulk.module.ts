import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BulkPageRoutingModule } from './bulk-routing.module';

import { BulkPage } from './bulk.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BulkPageRoutingModule,
    PipesModule
  ],
  declarations: [BulkPage]
})
export class BulkPageModule {}
