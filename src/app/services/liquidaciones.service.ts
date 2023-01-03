import { Injectable } from '@angular/core';
import { OneLiquidacion } from '../models/oneLiquidacion';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


 export class LiquidacionesService {
  liquidaciones: OneLiquidacion[] = [];

  constructor(

    public http: HttpClient 

  ) { }




  getURL(api){

let test : string = '';

if(!environment.prdMode)   test = environment.TestURL;

const URL = environment.preURL + test + environment.postURL  + api;
return URL;

  }


  getByID(ID){

    let URL = this.getURL(environment.ONE_Liquidacion);
    URL = URL+'/?ID='+ID;
    return this.http.get<OneLiquidacion[]>(URL);
  }

  postMethod(liquidacion:OneLiquidacion[])
  {

    let URL = this.getURL(environment.ONE_Liquidacion);

    URL = URL + '/';
    const options = {
      headers : {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    };

    console.log(liquidacion)

    return this.http.post(URL, JSON.stringify(liquidacion), options);

  }
  putMethod(liquidacion:OneLiquidacion)
  {

    let URL = this.getURL(environment.ONE_Liquidacion);
    URL = URL+'/?ID='+liquidacion.ORDEN_COMPRA+'&factura='+liquidacion.FACTURA;

    const options = {
      headers : {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Access-Control-Allow-rigin':'*'
      }
    };
console.log(liquidacion)
    return this.http.put(URL, JSON.stringify(liquidacion), options);

  }

  
  syncGetByID(ID){

return this.getByID(ID).toPromise();

  }
  syncPostToPromise(liquidacion:OneLiquidacion[]){

   return this.postMethod(liquidacion).toPromise();
  }
  syncPutToPromise(liquidacion:OneLiquidacion){

    return this.putMethod(liquidacion).toPromise();
   }

}
