import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { Companies } from '../models/companies';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  company:Companies = {
 id :null,
 id_user:null,
 active:null,
 name:null,
 description:null   
  };

companies:Companies[]=[];

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

  private getCompanies(){
    let URL = this.getAPI(environment.getCompaniesAPI);
    console.log('URL', URL)
    return this.http.get<Companies[]>(URL);
  }
  
  private postCompany(company:Companies){
    const URL = this.getAPI(environment.postCompanyAPI);
    const options = {
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Access-Control':'*'
      }
    }
    return this.http.post(URL, company, options);
  
  }
  
  
  private putCompany(company:Companies){
    let URL = this.getAPI(environment.putCompanyAPI);
        URL = URL + company.id
    const options = {
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    console.log(URL)
    console.log(company)
    return this.http.put(URL,company,options);
  }
  
  private deleteCompany(id:number){
    let URL = this.getAPI(environment.deleteCompanyAPI);
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
  
  
  syncGetCompaniesToPromise(){
   return  this.getCompanies().toPromise();
  }
  
  syncPostCompanyToPromise(company:Companies){
    return this.postCompany(company).toPromise();
  }
  syncPutCompanyToPromise(company:Companies){
    return this.putCompany(company).toPromise();
  }
  
  syncDeleteCompanyoPromise(id:number){
    return this.deleteCompany(id).toPromise();
  }
}
