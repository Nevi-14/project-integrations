import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { Customers } from '../models/customers';
import { Users } from '../models/users';
import { companyUsers } from '../models/company_users';
import { Companies } from '../models/companies';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  customers:Customers[]=[];
  constructor(
   private http: HttpClient,
   private alertService:AlertService 
  ) { }

  getAPI(api){
    let test = '';
    if(environment.prdMode) test = environment.TestURL;
    const   URL =  environment.preURL + test + environment.postURL + api;
    return URL;
  }

  private getLogIn(username:string){
    let URL = this.getAPI(environment.getLoginAPI);
        URL = URL + username;
    console.log('URL', URL)
    return this.http.get<Users[]>(URL);
  }
  private getCompanyUser(id:number){
    let URL = this.getAPI(environment.getCompanyUserAPI);
        URL = URL + id;
    console.log('URL', URL)
    return this.http.get<companyUsers[]>(URL);
  }
  private getCompany(id:number){
    let URL = this.getAPI(environment.getCompanyAPI);
        URL = URL + id;
    console.log('URL', URL)
    return this.http.get<Companies[]>(URL);
  }
  
  
  syncGetLogInToPromise(username:string){
   return  this.getLogIn(username).toPromise();
  }
  
  syncGetCompanyUserToPromise(id:number){
    return  this.getCompanyUser(id).toPromise();
   }
   syncGetCompanyToPromise(id:number){
    return  this.getCompany(id).toPromise();
   }
}
