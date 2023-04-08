import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyBoardPageRoutingModule } from './company-board-routing.module';

import { CompanyBoardPage } from './company-board.page';
 
import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyBoardPageRoutingModule,
    ComponentModule 
  ],
  declarations: [CompanyBoardPage]
})
export class CompanyBoardPageModule {}
