import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertasService } from '../services/alertas.service';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    public usuariosService: UsuariosService,
    public router: Router,
    public alertasService:AlertasService
  ){

  }
  canLoad()
    {
     const isAuthenticated = this.usuariosService.usuario;
     const navigation = this.router.getCurrentNavigation();
     if(isAuthenticated){

   
      return true
     }else{
      if(navigation){
        let url = navigation.extractedUrl.toString();
        this.router.navigateByUrl('inicio-sesion');
        this.alertasService.message('ISLEÑA','Inicia Sesión para continuar ..')
      }

return false
     }
  }
}
