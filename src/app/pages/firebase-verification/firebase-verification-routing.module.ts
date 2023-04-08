import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirebaseVerificationPage } from './firebase-verification.page';

const routes: Routes = [
  {
    path: '',
    component: FirebaseVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirebaseVerificationPageRoutingModule {}
