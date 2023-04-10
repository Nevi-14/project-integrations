import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyInformationPageRoutingModule } from './company-information-routing.module';

import { CompanyInformationPage } from './company-information.page';
import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyInformationPageRoutingModule,
    ComponentModule
  ],
  declarations: [CompanyInformationPage]
})
export class CompanyInformationPageModule {}
