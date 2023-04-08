import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseVerificationPage } from '../firebase-verification/firebase-verification.page';
import { ModalController } from '@ionic/angular';
import { RegistrationService } from 'src/app/services/registration.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-company-builder',
  templateUrl: './company-builder.page.html',
  styleUrls: ['./company-builder.page.scss'],
})
export class CompanyBuilderPage implements OnInit {
  isModalOpen = false;
  constructor(
public settingsService: SettingsService,
public router: Router,
public modalCtrl: ModalController,
public registrationService:RegistrationService


  ) { }

  ngOnInit() {
  }
  home(){

    this.router.navigateByUrl('/', {replaceUrl:true})

  }

  async  firebaseVerification(){

    this.isModalOpen = true;

    const modal = await this.modalCtrl.create({
      component:FirebaseVerificationPage,
      cssClass:'ui-modal'
    })

    if(this.isModalOpen){

    modal.present();

    const {data} = await modal.onDidDismiss();
    this.isModalOpen = false;
    if(data != undefined){
      console.log('data')
    }
    }
    
  }
}
