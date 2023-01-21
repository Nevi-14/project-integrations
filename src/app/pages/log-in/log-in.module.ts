import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

 
import { LogInPage } from './log-in.page';
import { LogInPageRoutingModule } from './log-in-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogInPageRoutingModule
  ],
  declarations: [LogInPage]
})
export class LogInPageModule {}
