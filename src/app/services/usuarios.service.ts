import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ONEOCAprob } from '../models/ONEOCAprob';
import { ONEUserAprob } from '../models/ONEUserAprob';
import { Usuarios } from '../models/usuarios';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
usuarios:Usuarios[]=[];
usuario:Usuarios;
approvers:ONEUserAprob[]=[];
ocAppData:ONEOCAprob[]=[];

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

  getURLTest(api){
    let test : string = '';
  
    if(!environment.prdMode){
  
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
  


  private getONEUserAprob(){
    let URL = this.getURLTest(environment.ONE_UserAprob);
    return this.http.get<ONEUserAprob[]>(URL);
  }

  private getONEOCAprob(){
    let URL = this.getURLTest(environment.ONE_UserAprob);
    return this.http.get<ONEOCAprob[]>(URL);
  }
  private postONEOCAprob(data:ONEOCAprob[]){
    const URL = this.getURLTest( environment.ONE_OCAprob );
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
  console.log('post orden', URL)
  console.log('JSON data:', JSON.stringify(data));
    return this.http.post( URL, JSON.stringify(data), options );
  }

  syncGetONEUserAprob(){
    return  this.getONEUserAprob().subscribe(
  
      resp => {
  
        this.approvers = resp.slice(0);
        console.log('this.approvers', this.approvers)
    

      }, error =>{
  
  console.log('error', error)

  
      }
    )
    }

    syncGetONEOCAprob(){
      return  this.getONEOCAprob().subscribe(
    
        resp => {
    
          this.ocAppData = resp.slice(0);
          console.log('this.ocAppData', this.ocAppData)
      
  
        }, error =>{
    
    console.log('error', error)
  
    
        }
      )
      }
  syncGetONEUserAprobToPromise(){
    return  this.getONEUserAprob().toPromise();
    }
    syncPostONEOCAprobToPromise(data:ONEOCAprob[]){
      return  this.postONEOCAprob(data).toPromise();
      }
}
