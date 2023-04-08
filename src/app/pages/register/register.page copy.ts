import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegistrationService } from 'src/app/services/registration.service';
import industriesJSON from '../../../assets/data/indutries.json';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
interface industry {
  id: number,
  english: string,
  spanish:  string,
  image:  string
}
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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
  register(){
    this.modalCtrl.dismiss();
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
