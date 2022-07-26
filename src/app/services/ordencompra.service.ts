import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bodegas } from '../models/bodegas';
import { OrdenCompra } from '../models/ordencompra';
import { UltimaOrdenCompra } from '../models/ultimaOrdencompra';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {
  ordenesDeCompra:OrdenCompra[]=[];
  ordenCompra:OrdenCompra = null;
  ultimaOrdenCompra:UltimaOrdenCompra = null;

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
 
  private getUltimaOrdenCompra(){
    const URL = this.getURL(environment.ultimaOrdenCompraURL);
    console.log('URL', URL)
    return this.http.get<UltimaOrdenCompra[]>(URL)
  }
  private getOrdenCompraEstado(estado:string){
    let URL = this.getURL(environment.ordenCompraEstadoURL);
    URL = URL+ estado;
    console.log('URL', URL)
    return this.http.get<OrdenCompra[]>(URL)
  }

  private postOrdenCompra (ordenCompra:OrdenCompra[]){
    const URL = this.getURL( environment.ordenCompraURL );
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
  
    return this.http.post( URL, JSON.stringify(ordenCompra), options );
  }

  syncPostOrdenCompraToPromise(ordenCompra: OrdenCompra[]){

    return  this.postOrdenCompra(ordenCompra).toPromise();
  }

  syncGetOrdenesCompraEstado(estado: string){
    this.ordenesDeCompra = [];
  this.alertasService.presentaLoading('Cargando ordenes...')
    this.getOrdenCompraEstado(estado).subscribe(

      resp => {

        this.ordenesDeCompra = resp;
        console.log('this.ordenesDeCompra', this.ordenesDeCompra)

        this.alertasService.loadingDissmiss();

      }, error =>{

        this.alertasService.loadingDissmiss();

      }
    )
  }



  syncGetOrdenesCompraEstadoToPromise(estado: string){
    return  this.getOrdenCompraEstado(estado).toPromise();
  }

  



  syncUltimaOrdenCompra(){
    this.alertasService.presentaLoading('Cargando datos...')
    this.getUltimaOrdenCompra().subscribe(

      resp => {

        this.ultimaOrdenCompra = resp[0];
        console.log('this.ultimaOrdenCompra', this.ultimaOrdenCompra)

        this.alertasService.loadingDissmiss();

      }, error =>{

        this.alertasService.loadingDissmiss();

      }
    )
  }

  syncUltimaOrdenCompraToPromise(){
    return this.getUltimaOrdenCompra().toPromise();
  }

}
