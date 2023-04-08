import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirebaseVerificationPageRoutingModule } from './firebase-verification-routing.module';

import { FirebaseVerificationPage } from './firebase-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirebaseVerificationPageRoutingModule
  ],
  declarations: [FirebaseVerificationPage]
})
export class FirebaseVerificationPageModule {}
