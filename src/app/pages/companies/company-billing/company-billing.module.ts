import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyBillingPageRoutingModule } from './company-billing-routing.module';

import { CompanyBillingPage } from './company-billing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyBillingPageRoutingModule
  ],
  declarations: [CompanyBillingPage]
})
export class CompanyBillingPageModule {}
