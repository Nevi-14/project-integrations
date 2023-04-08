import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanySettingsPageRoutingModule } from './company-settings-routing.module';

import { CompanySettingsPage } from './company-settings.page';
import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanySettingsPageRoutingModule,
    ComponentModule
  ],
  declarations: [CompanySettingsPage]
})
export class CompanySettingsPageModule {}
