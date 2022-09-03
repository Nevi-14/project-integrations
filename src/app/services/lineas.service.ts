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
 console.log('URL post lineas: ', URL);
 console.log('JSON Lineas:', JSON.stringify(lineas));
  return this.http.post( URL, JSON.stringify(lineas), options );
}

private putLineas (linea:Lineas){
  let  URL = this.getURL( environment.lineasPostURL);
       URL = URL + environment.idParam + linea.ORDEN_COMPRA + environment.numParam+linea.ORDEN_COMPRA_LINEA
  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
  };
 console.log('URL put lineas: ', URL);
 console.log('JSON Lineas:', JSON.stringify(linea));
  return this.http.put( URL, JSON.stringify(linea), options );
}

private consultarLineasOrdenCompra(oc:string){
  let URL  = this.getURL(environment.consultarOrdenCompraLineasURL);

  URL = URL +oc;
  console.log('consultarlineas', URL)
 return this.http.get<Lineas[]>(URL);


}

syncConsultarLineasOrdenCompra(oc:string){

  return  this.consultarLineasOrdenCompra(oc).toPromise();
  }
  
syncPostLineasToPromise(lineas:Lineas[]){

return  this.postLineas(lineas).toPromise();
}
syncPutLineasToPromise(linea:Lineas){

  return  this.putLineas(linea).toPromise();
  }

}