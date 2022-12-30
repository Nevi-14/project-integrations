import { Injectable } from '@angular/core';
import { Desalmacenaje } from '../models/desalmacenaje';
import { HttpClient } from '@angular/common/http';
import { Lineas } from '../models/lineas copy';
import { ar } from 'date-fns/locale';
import { AlertasService } from './alertas.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesalmacenajeService {

  articulosDesalmacenados:Desalmacenaje[]=[];

  constructor(
    public http: HttpClient,
    public alertasService: AlertasService

  ) { }






    // FUNCIONES



    // AGREGAR ARCITUCLO 



  agregarActualizarArticulo(item:Lineas, cantidad:number){

    if(cantidad > item.CANTIDAD_ORDENADA){
this.alertasService.message('DIONE', 'Lo sentimos la cantidad a desalmacenar no puede exceder la cancitdad ordenada!.')
      return;
    }

const articulo:Desalmacenaje = {

   ORDEN_COMPRA:item.ORDEN_COMPRA,
   ORDEN_COMPRA_LINEA:item.ORDEN_COMPRA_LINEA,
  ARTICULO:item.ARTICULO,
   BODEGA: item.BODEGA,
   DESCRIPCION: item.DESCRIPCION,
  CANTIDAD_RECIBIDA: item.CANTIDAD_RECIBIDA,
  CANTIDAD_DESALMACENADA: cantidad,
  SALDO: item.CANTIDAD_ORDENADA - cantidad,
  FACTOR_CONVERSION: item.FACTOR_CONVERSION,
   LOTE : null,
   nuevo : true
}

const i = this.articulosDesalmacenados.findIndex( a => a.ARTICULO == articulo.ARTICULO);

if(i >=0){
  if(cantidad == 0){
    this.articulosDesalmacenados.splice(i, 1);
    return;
  }
  this.articulosDesalmacenados[i].CANTIDAD_DESALMACENADA = cantidad;
  this.articulosDesalmacenados[i].SALDO  = item.CANTIDAD_RECIBIDA -  cantidad;

}else{

  this.articulosDesalmacenados.push(articulo);
}

console.log(this.articulosDesalmacenados, ' articulos');

  }

  





  // GET API URL

  getURL(api){

    let test : string = '';
  
    if(!environment.prdMode){
  
      test = environment.TestURL;
    }
  const URL =  environment.preURL + test +environment.postURL + api;
  return URL;
  }
  


  // GET DATA
  getArticulos(ID){
  
    let URL  = this.getURL(environment.ONE_Desalmacenaje);
  
    URL = URL  +'?ID='+ ID;
    console.log('Desalmacenaje', URL);
   return this.http.get<Desalmacenaje[]>(URL);
  
  
  }


  private postArticulos (articulos:Desalmacenaje[]){

    const URL = this.getURL( environment.ONE_Desalmacenaje);
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };

   console.log('URL post postArticulos: ', URL);
   console.log('JSON postArticulos:', JSON.stringify(articulos));
    return this.http.post( URL, JSON.stringify(articulos), options );
  }





  
  private putArticulo (articulos:Desalmacenaje){
    let  URL = this.getURL( environment.ONE_Desalmacenaje);
         URL = URL +'/?ID=' + articulos.ORDEN_COMPRA +'&linea='+articulos.ORDEN_COMPRA_LINEA;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   console.log('URL put putArticulo: ', URL);
 
    return this.http.put( URL, JSON.stringify(articulos), options );
  }





  syncGetArticulosToPromise(ID){

  return this.getArticulos(ID).toPromise();

  }

 
  // POST DATA

  syncPostArticulos(articulos:Desalmacenaje[]){

    return this.postArticulos(articulos).toPromise();
  
    }

  // DELETE DATA

  syncPutArticulo(articulos:Desalmacenaje){

    return this.putArticulo(articulos).toPromise();
  
    }



}
