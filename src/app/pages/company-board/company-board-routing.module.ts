import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyBoardPage } from './company-board.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyBoardPageRoutingModule {}
