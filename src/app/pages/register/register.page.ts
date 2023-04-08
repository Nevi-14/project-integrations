import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegistrationService } from 'src/app/services/registration.service';
import industriesJSON from '../../../assets/data/indutries.json';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { Users } from 'src/app/models/users';
import { Companies } from 'src/app/models/companies';
import { companyUsers } from 'src/app/models/company_users';
import { UsersService } from 'src/app/services/users.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { CompanyUsersService } from 'src/app/services/company-users.service';
import { AlertService } from 'src/app/services/alert.service';
import { EmailService } from 'src/app/services/email.service';
interface email {
  toEmail:string,
  file:string,
  subject:string,
  body:string
}
interface industry {
  id: number,
  english: string,
  spanish: string,
  image: string
}
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  industries: industry[] = industriesJSON;
  user: Users = {
    id: null,
    active: true,
    lastname: null,
    name: null,
    email: null,
    password: null,
    description: 'Company Owner',
  }
  company: Companies = {
    id: null,
    id_user: null,
    active: true,
    name: null,
    description: null
  }

  company_user: companyUsers = {
    id: null,
    iD_USER: null,
    iD_COMPANY: null,
    administrator: true
  }

   email:email = {
    toEmail:null,
    file:null,
    subject:'Welcome to Dev-Coding'  ,
    body:'Dear user, we are happy you are joining the Dev-Coding community!.' 
  }
  constructor(
    public alertService:AlertService,
    public modalCtrl: ModalController,
    public router: Router,
    public settingsService: SettingsService,
    public registrationService: RegistrationService,
    public usersService:UsersService,
    public companiesService:CompaniesService,
    public companyUsersService:CompanyUsersService,
    public emailService:EmailService


  ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
  register() {
    this.alertService.presentaLoading('Creating account..')
this.usersService.syncPostUserToPromise(this.user).then( (user:Users) =>{
this.usersService.user = user;
this.company.id_user = user.id;
this.company_user.iD_USER = user.id;
this.companiesService.syncPostCompanyToPromise(this.company).then((company:Companies) =>{
  this.companiesService.company = company;
  this.company_user.iD_COMPANY = company.id;
  this.companyUsersService.syncPostCompanyUserToPromise(this.company_user).then(companyUser =>{
 this.email.toEmail = this.user.email;
    this.emailService.syncPostEmailToPromise(this.email).then(welcome =>{

      this.alertService.loadingDissmiss();
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/home/project-info', { replaceUrl: true })
      this.alertService.message('Dev-Coding','Welcome to Dev-For-Business')

    }, error =>{
      this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','Something Went Wrong!.')
        })






  }, error =>{
this.alertService.loadingDissmiss();
this.alertService.message('Dev-Coding','Something Went Wrong!.')
  })
}, error =>{
  this.alertService.loadingDissmiss();
  this.alertService.message('Dev-Coding','Something Went Wrong!.')
})

    }, error =>{
      this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','Something Went Wrong!.')
    })
 
  }

  chooseIndustry($event) {
    const data: industry = $event.detail.value
    if ($event.detail.checked) {

      let i = this.registrationService.companyIndustries.findIndex(industry => industry.id == data.id)
      if (i < 0) {
        this.registrationService.companyIndustries.push(data);
      } else {
        this.registrationService.companyIndustries.splice(i, 1);
      }
    }
    console.log('event', $event)
  }
}
