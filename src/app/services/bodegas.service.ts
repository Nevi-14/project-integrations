import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bodegas } from '../models/bodegas';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class BodegasService {
bodegas:Bodegas[] =[];
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
 
private getBodegas(){
  const URL = this.getURL(environment.bodegasURL);
  console.log('URL', URL)
  return this.http.get<Bodegas[]>(URL)


}

syncGetBodegasToPromise(){

 return this.getBodegas().toPromise();


}

syncGetProvedores(){
  this.bodegas = [];
this.alertasService.presentaLoading('Cargando datos...')
  this.getBodegas().subscribe(

    resp => {

this.bodegas = resp.slice(0);
console.log('this.bodegas', this.bodegas)

this.alertasService.loadingDissmiss();
    }, error =>{


      this.alertasService.loadingDissmiss();

    }
  )
}
}
