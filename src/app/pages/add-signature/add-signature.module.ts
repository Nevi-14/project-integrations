import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSignaturePageRoutingModule } from './add-signature-routing.module';

import { AddSignaturePage } from './add-signature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSignaturePageRoutingModule
  ],
  declarations: [AddSignaturePage]
})
export class AddSignaturePageModule {}
