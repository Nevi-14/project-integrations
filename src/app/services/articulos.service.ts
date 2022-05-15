import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Articulos } from '../models/articulos';
import { AlertasService } from './alertas.service';
interface PostArticulos {
  articulo:Articulos,
  Unidades:number,
  Cajas:number,
  Total: number
}
@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
articulosPostArray:PostArticulos[]=[];
articulos:Articulos[]=[];
articulosProveedor:Articulos[]=[];
  constructor(
    public http: HttpClient,
    public alertasService: AlertasService
  ) { }

getURL(api){

  let test : string = '';

  if(!environment.TestURL){

    test = environment.TestURL;
  }
const URL =  environment.preURL + test +environment.postURL + api;
return URL;
}

getArticulos(IDProv){

  let URL  = this.getURL(environment.articulosURL);

  URL = URL + environment.idProvedorParam + IDProv;
 return this.http.get<Articulos[]>(URL);


}

syncGetArticulos(IDProv){
  this.articulos = [];
this.alertasService.presentaLoading('Cargando datos...')
this.getArticulos(IDProv).subscribe(
  resp =>{
this.articulos = resp.slice(0);
this.alertasService.loadingDissmiss();
console.log('this.articulos', this.articulos)
  }, error =>{
    this.alertasService.loadingDissmiss();

  }
)
  
}

}
