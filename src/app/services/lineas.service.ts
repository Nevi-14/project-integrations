import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrdenCompra } from '../models/ordencompra';
import { UltimaOrdenCompra } from '../models/ultimaOrdencompra';
import { AlertasService } from './alertas.service';
import { Lineas } from '../models/lineas';

@Injectable({
  providedIn: 'root'
})
export class LineasService {


  constructor(
    private http: HttpClient,
    public alertasService:AlertasService
  ) { }


getURL(api){

let test : string = '';

if(!environment.prdMode){

test = environment.TestURL;

}

const URL = environment.preURL + test + environment.postURL + api;

return URL;
  
}
 

private postLineas (lineas:Lineas[]){
  const URL = this.getURL( environment.lineasPostURL);
  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
  };
 console.log('URL', URL)
  return this.http.post( URL, JSON.stringify(lineas), options );
}

syncPostLineasToPromise(lineas:Lineas[]){

return  this.postLineas(lineas).toPromise();
}


}