import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { Customers } from '../models/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
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

  private getCustomers(id:number){
    let URL = this.getAPI(environment.getCustomersAPI);
        URL = URL + id;
    console.log('URL', URL)
    return this.http.get<Customers[]>(URL);
  }
  
  private postCustomer(customer:Customers){
    const URL = this.getAPI(environment.postCustomerAPI);
    const options = {
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Access-Control':'*'
      }
    }
    return this.http.post(URL, customer, options);
  
  }
  
  
  private putCustomer(customer:Customers){
    let URL = this.getAPI(environment.putCustomerAPI);
        URL = URL + customer.id
    const options = {
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    console.log(URL)
    console.log(customer)
    return this.http.put(URL,customer,options);
  }
  
  private deleteCustomer(id:number){
    let URL = this.getAPI(environment.deleteCustomerAPI);
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
  
  
  syncGetCustomersToPromise(id:number){
   return  this.getCustomers(id).toPromise();
  }
  
  syncPostCustomerToPromise(customer:Customers){
    return this.postCustomer(customer).toPromise();
  }
  syncPutCustomerToPromise(customer:Customers){
    return this.putCustomer(customer).toPromise();
  }
  
  syncDeleteCustomerToPromise(id:number){
    return this.deleteCustomer(id).toPromise();
  }
}
