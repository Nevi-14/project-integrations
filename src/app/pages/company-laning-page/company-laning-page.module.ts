import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyLaningPagePageRoutingModule } from './company-laning-page-routing.module';

import { CompanyLaningPagePage } from './company-laning-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyLaningPagePageRoutingModule
  ],
  declarations: [CompanyLaningPagePage]
})
export class CompanyLaningPagePageModule {}
