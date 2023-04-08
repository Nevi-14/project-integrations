import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyBuilderPageRoutingModule } from './company-builder-routing.module';

import { CompanyBuilderPage } from './company-builder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyBuilderPageRoutingModule
  ],
  declarations: [CompanyBuilderPage]
})
export class CompanyBuilderPageModule {}
