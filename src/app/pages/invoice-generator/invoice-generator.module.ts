import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceGeneratorPageRoutingModule } from './invoice-generator-routing.module';

import { InvoiceGeneratorPage } from './invoice-generator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceGeneratorPageRoutingModule
  ],
  declarations: [InvoiceGeneratorPage]
})
export class InvoiceGeneratorPageModule {}
