import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from '../../models/users';
import { CompaniesService } from 'src/app/services/companies.service';
import { companyUsers } from 'src/app/models/company_users';
import { CompanyUsersService } from 'src/app/services/company-users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
user:Users = {
 id:null,
 active:true,
 name:null,
 lastname:null,
 email:null,
 password:null,
 description:null,
}
company_user: companyUsers = {
  id: null,
  iD_USER: null,
  iD_COMPANY: null,
  administrator: false
}
constructor(
 public modalCtrl:ModalController,
 public usersService:UsersService,
 public alertService:AlertService,
 public companiesService:CompaniesService,
 public companyUsersService:CompanyUsersService   
  ) { }

  ngOnInit() {
    this.company_user.iD_COMPANY = this.companiesService.company.id;
  }
  closeModal(){
    this.modalCtrl.dismiss();
  }

  postUser(){
    this.alertService.presentaLoading('Adding user, please wait...')
    this.usersService.syncPostUserToPromise(this.user).then(async (user:Users) =>{
      this.company_user.iD_USER = user.id;
      console.log('user', user)
      console.log('this.company_user', this.company_user)
      this.companyUsersService.syncPostCompanyUserToPromise(this.company_user).then(async (resp) =>{
        await this.alertService.loadingDissmiss();
        this.alertService.message('Dev-Coding','The user has been created!');
        this.alertService.presentaLoading('Loading data...')
        await  this.usersService.syncGetUsersToPromise(this.companiesService.company.id).then(async (resp) =>{
          await this.alertService.loadingDissmiss();
          this.usersService.users = [];
          this.usersService.users =    resp.slice(0);
          this.closeModal();
        }, error =>{
          this.alertService.loadingDissmiss();
          this.alertService.message('Dev-Coding','Ups something went wrong!..')
        })

      } , error =>{

        this.alertService.loadingDissmiss();
        this.alertService.message('Dev-Coding','Ups something went wrong!..')

      })
 
    
    }, error =>{
      this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','Ups something went wrong!..')
    })
  }
}
