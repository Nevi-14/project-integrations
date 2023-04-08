import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { Customers } from '../models/customers';
import { companyUsers } from '../models/company_users';

@Injectable({
  providedIn: 'root'
})
export class CompanyUsersService {
  users:companyUsers[]=[];
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

  private getCompanyUsers(){
    let URL = this.getAPI(environment.getCompanyUsersAPI);
    console.log('URL', URL)
    return this.http.get<companyUsers[]>(URL);
  }
  
  private postCompanyUser(user:companyUsers){
    const URL = this.getAPI(environment.postCompanyUserAPI);
    const options = {
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Access-Control':'*'
      }
    }
    return this.http.post(URL, user, options);
  
  }
  
  
  private putCompanyUser(user:companyUsers){
    let URL = this.getAPI(environment.putCompanyUserAPI);
        URL = URL + user.id
    const options = {
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    console.log(URL)
    console.log(user)
    return this.http.put(URL,user,options);
  }
  
  private deleteCompanyUser(id:number){
    let URL = this.getAPI(environment.deleteCompanyUserAPI);
        URL = URL + id;
        const options = {
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
    return this.http.delete(URL,options);
  }
  
  
  syncGetCompanyUsersToPromise(){
   return  this.getCompanyUsers().toPromise();
  }
  
  syncPostCompanyUserToPromise(user:companyUsers){
    return this.postCompanyUser(user).toPromise();
  }
  syncPutCompanyUserToPromise(user:companyUsers){
    return this.putCompanyUser(user).toPromise();
  }
  
  syncDeleteCompanyUserToPromise(id:number){
    return this.deleteCompanyUser(id).toPromise();
  }
}
