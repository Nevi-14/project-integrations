import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../models/usuarios';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
usuarios:Usuarios[]=[];
usuario:Usuarios;

  constructor(

    private http: HttpClient,
    private alertasService: AlertasService
  ) { }

  getURL(api){

    let test : string = '';
  
    if(!environment.TestURL){
  
      test = environment.TestURL;
    }
  const URL =  environment.preURL + test +environment.postURL + api;
  return URL;
  }
  
 private  getUsers(usuario: string){
    let  URL = this.getURL(environment.usuariosURL);
    URL = URL + `?User=${usuario}`;
    return this.http.get<Usuarios[]>(URL);
  }

  syngGetUsers(usuario){
    this.usuarios = [];
    this.alertasService.presentaLoading('Cargando datos...')
    this.getUsers(usuario).subscribe(
  
      resp => {
  
        this.usuarios = resp.slice(0);
        console.log('this.usuarios', this.usuarios)
    
        this.alertasService.loadingDissmiss();
      }, error =>{
  
  
        this.alertasService.loadingDissmiss();
  
      }
    )
  }
  syngGetUsersToPromise(usuario){
  return  this.getUsers(usuario).toPromise();
  }
  


}
