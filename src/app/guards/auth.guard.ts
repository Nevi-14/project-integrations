import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
 


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
  
    public router: Router,
    public alertService:AlertService
  ){

  }
  canLoad()
    {
     const isAuthenticated = null; // this.usuariosService.usuario
     const navigation = this.router.getCurrentNavigation();
      
     return true
     if(isAuthenticated){

   
      return true
     }else{
      if(navigation){
        let url = navigation.extractedUrl.toString();
        this.router.navigateByUrl('inicio-sesion');
        this.alertService.message('ISLEÑA','Inicia Sesión para continuar ..')
      }

return false
     }
  }
}
