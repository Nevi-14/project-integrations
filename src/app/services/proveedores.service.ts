import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proveedores } from '../models/proveedores'
import { environment } from 'src/environments/environment';
import { AlertasService } from './alertas.service';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  proveedores:Proveedores[]=[];

  constructor(
    private http: HttpClient,
    public alertasService:AlertasService
  ) { }


getURL(api, id){

let test : string = '';

if(!environment.prdMode){

test = environment.TestURL;

}

const URL = environment.preURL + test + environment.postURL + api + id;

return URL;
  
}
 
private getProveedores(id){
  const URL = this.getURL(environment.proveedoresURL, id);
  return this.http.get<Proveedores[]>(URL)


}

syncGetProvedores(id){
  this.proveedores = [];
this.alertasService.presentaLoading('Cargando datos...')
  this.getProveedores(id).subscribe(

    resp => {

this.proveedores = resp.slice(0);
console.log('this.proveedores', this.proveedores)
let currentDate = new Date().toISOString();
localStorage.setItem('proveedores',JSON.stringify(this.proveedores))
this.alertasService.loadingDissmiss();
    }, error =>{


      this.alertasService.loadingDissmiss();

    }
  )
}

}
