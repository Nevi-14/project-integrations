import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { LogInService } from 'src/app/services/log-in.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users';
import { CompaniesService } from 'src/app/services/companies.service';
import { CompanyUsersService } from 'src/app/services/company-users.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  image = '../assets/imgs/devCodingLogo.svg';
  showPass = false;
  username: string = null;
  password: string = null;

  constructor( public route: Router,
               private alertService: AlertService,
               public logingService:LogInService,
               public usersService:UsersService,
               public companiesService:CompaniesService,
               public companyUsersService:CompanyUsersService
               
               ) { }

  ngOnInit() {
  }

  loginMethod(){
    console.log(this.username);
    console.log(this.password);
    this.alertService.presentaLoading('Loading Dara');
    this.logingService.syncGetLogInToPromise(this.username).then( (user:Users[]) => {
      this.alertService.loadingDissmiss();
      if(user.length > 0){
        this.usersService.user = user[0];
        this.logingService.syncGetCompanyUserToPromise(user[0].id).then( company_user =>{
          this.logingService.syncGetCompanyToPromise(company_user[0].id_company).then( company =>{
this.companiesService.company = company[0];
this.route.navigate(['/home']);

          }, error =>{
            this.alertService.message('Dev-Coding', 'Sorry, Something Went Wrong!.');
          })
        }, error =>{
          this.alertService.message('Dev-Coding', 'Sorry, Something Went Wrong!.');
        })
      }else{
        this.alertService.message('Dev-Coding', 'Sorry, Something Went Wrong!.');
      }


    }, error =>{
      this.alertService.message('Dev-Coding', 'Sorry, Something Went Wrong!.');
    })





/**
 * 
    this.usuariosService.syngGetUsersToPromise(this.usuario, this.clave).then(
      resp => {
        this.alertas.loadingDissmiss();
        if (resp.length > 0){
          console.log(resp);
          if (resp[0].Clave === this.clave){
            this.usuariosService.usuario = resp[0];
            this.route.navigate(['/inicio']);
          } else {
            this.alertas.message('ERROR', 'Usuario o clave incorrectos.');
          }
        } else {
          this.alertas.message('ERROR', 'Usuario o clave incorrectos.');
        }
      }, error => {
        this.alertas.loadingDissmiss();
        this.alertas.message('Error', `No se puede acceder a la BD. ${error.message}`);
      }
    )
 */

    //this.route.navigate(['/inicio']);
  }

}
