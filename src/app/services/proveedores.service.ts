import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proveedores } from '../models/proveedores';
import { environment } from 'src/environments/environment';
import { AlertasService } from './alertas.service';
import * as XLSX from 'xlsx'; // npm install xlsx --save && npm 
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  proveedores:Proveedores[]=[];

  constructor(
    private http: HttpClient,
    public alertasService:AlertasService,
    public platform: Platform
  ) { }


  getURL(api, id){

    let test : string = '';

    if(!environment.prdMode){

      test = environment.TestURL;

    }

    const URL = environment.preURL + test + environment.postURL + api + id;
console.log('URL', URL)
    return URL;
    
  }

  exportarProovedores(){
let data = []

for (let i =0; i <    this.proveedores.length; i++){
  data.push({
    Codigo:this.proveedores[i].ID,
    Nombre: this.proveedores[i].NOMBRE
  })

  if (i ==    this.proveedores.length-1){

this.exportToExcel(data, 'Lista de provedores')

  }
}
 
  }
  async exportToExcel(data, filename) {
    {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, filename);
   // console.log('XLSX',XLSX.writeFile(wb, filename + '.xlsx'))
   console.log('XLSX',XLSX)

   XLSX.writeFile(wb, filename + '.xlsx')

}
  }

 
    
   
  private getProveedores(id){
    const URL = this.getURL(environment.proveedoresURL, id);
    console.log('proveeores ur', URL)
    return this.http.get<Proveedores[]>(URL);
  }
  syncGetProvedorestoPromise(id){
   return  this.getProveedores(id).toPromise();
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
