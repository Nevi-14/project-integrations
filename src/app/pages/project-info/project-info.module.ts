import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ProjectInfoPageRoutingModule } from './project-info-routing.module';
import { ProjectInfoPage } from './project-info.page';

 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectInfoPageRoutingModule
  ],
  declarations: [ProjectInfoPage]
})
export class ProjectInfoPageModule {}
