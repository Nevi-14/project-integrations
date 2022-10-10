import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Archivos } from '../models/archivos';

@Injectable({
  providedIn: 'root'
})
export class GestorArchivosService {
  archivos:Archivos[] = [];
  constructor(
    public http: HttpClient

  ) { }

  getURL(api) {
    let test: string = '';
    if (!environment.prdMode) {
      test = environment.TestURL;
    }
    const URL = environment.preURL + test + environment.postURL + api;
    return URL;

  }

  private cargarArchivoPost(tipo, archivo) {

    let URL = this.getURL(environment.gestorArchivos);
    URL = URL + environment.tipoParam + tipo
    const options = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
      }
    };
    console.log(' CARGAR ARCHIVO URL', URL, 'tipo',tipo,'archivo', JSON.stringify(archivo))
    return this.http.post(URL, archivo, options);


  }

  syncCargarArchivoPost(tipo, archivo) {
    return this.cargarArchivoPost(tipo, archivo).toPromise();

  }

  private getArchivos(ID) {
    let URL = this.getURL(environment.ONE_GestorArch);
    URL = URL + environment.idParam + ID;

    console.log(' GET URL', URL, 'ID', JSON.stringify(ID))
    return this.http.get<Archivos[]>(URL)

  }


  syncGetArchivosToPromise(ID) {
    return this.getArchivos(ID).toPromise();


  }
  private postArchivo(registro: Archivos) {


    let URL = this.getURL(environment.ONE_GestorArch);

    const options = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',

      }
    };
    console.log(' POST URL', URL, 'archivo', JSON.stringify(registro))

    return this.http.post(URL, [registro], options);


  }


  syncPostArchivosToPromise(registro: Archivos) {
    return this.postArchivo(registro).toPromise();

  }
  private putArchivo(registro: Archivos) {


    let URL = this.getURL(environment.ONE_GestorArch);
        URL =  URL + environment.idParam + registro.ORDEN_COMPRA +environment.tipoParam2+registro.Tipo+environment.nombreParam + registro.Nombre

    const options = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',

      }
    };
    console.log(' PUT URL', URL, 'archivo', JSON.stringify(registro))
   

    return this.http.put(URL, registro, options);


  }

  syncPutArchivosToPromise(registro: Archivos) {
    return this.putArchivo(registro).toPromise();

  }
}
