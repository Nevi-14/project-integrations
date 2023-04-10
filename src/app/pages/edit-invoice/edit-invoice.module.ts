import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditInvoicePageRoutingModule } from './edit-invoice-routing.module';

import { EditInvoicePage } from './edit-invoice.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentModule } from 'src/app/components/component.module';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditInvoicePageRoutingModule,
    PipesModule,
    ComponentModule
  ],
  declarations: [EditInvoicePage]
})
export class EditInvoicePageModule {}
