import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products:Products[]=[];
  constructor(
    private http: HttpClient,
    private alertService:AlertService
  ) { }


  getAPI(api){
    let test = '';
    if(environment.prdMode) test = environment.TestURL;
    const URL = environment.preURL + test + environment.postURL + api;
    return URL;
  }

  private getProducts(id:number){
    let URL = this.getAPI(environment.getProductsAPI);
        URL = URL  + id;
    console.log('URL', URL)
    return this.http.get<Products[]>(URL);
  }
  
  private postProduct(product:Products){
    const URL = this.getAPI(environment.postProductsAPI);
    const options = {
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Access-Control':'*'
      }
    }
    return this.http.post(URL, product, options);
  
  }
  
  
  private putProduct(product:Products){
    let URL = this.getAPI(environment.putProductAPI);
        URL = URL + product.id
    const options = {
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    console.log(URL)
    console.log(product)
    return this.http.put(URL,product,options);
  }
  
  private deleteProduct(id:number){
    let URL = this.getAPI(environment.deleteProductAPI);
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
  
  
  syncGetProductsToPromise(id:number){
   return  this.getProducts(id).toPromise();
  }
  
  syncPostProductToPromise(product:Products){
    return this.postProduct(product).toPromise();
  }
  syncPutProductToPromise(product:Products){
    return this.putProduct(product).toPromise();
  }
  
  syncDeleteProductToPromise(id:number){
    return this.deleteProduct(id).toPromise();
  }
}
