import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import industriesJSON from '../../../assets/data/indutries.json';
import { SettingsService } from 'src/app/services/settings.service';
import { RegistrationService } from 'src/app/services/registration.service';
interface industry {
  id: number,
  english: string,
  spanish:  string,
  image:  string
}

@Component({
  selector: 'app-industries',
  templateUrl: './industries.page.html',
  styleUrls: ['./industries.page.scss'],
})
export class IndustriesPage implements OnInit {
industries:industry[]= industriesJSON;
  constructor(
public modalCtrl: ModalController,
public router: Router,
public settingsService: SettingsService,
public registrationService: RegistrationService

  ) { }

  ngOnInit() {
  }
  cerrarModal(){

    this.modalCtrl.dismiss();
    
  }

  onSearchChange($event){

  }
  companyBuilder(){

this.cerrarModal();
    this.router.navigateByUrl('/company-builder', {replaceUrl:true})
  }
  chooseIndustry($event){
const data:industry = $event.detail.value
    if($event.detail.checked){

      let i = this.registrationService.companyIndustries.findIndex(industry => industry.id == data.id )
      if(i < 0){
        this.registrationService.companyIndustries.push(data);
      }else{
        this.registrationService.companyIndustries.splice(i, 1);
      }
    }
console.log('event', $event)
  }
}
