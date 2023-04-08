import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyBuilderDepartmentsPageRoutingModule } from './company-builder-departments-routing.module';

import { CompanyBuilderDepartmentsPage } from './company-builder-departments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyBuilderDepartmentsPageRoutingModule
  ],
  declarations: [CompanyBuilderDepartmentsPage]
})
export class CompanyBuilderDepartmentsPageModule {}
