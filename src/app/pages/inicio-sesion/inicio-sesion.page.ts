import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from '../../services/alertas.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  image = '../assets/imgs/devCodingLogo.svg';
  showPass = false;
  usuario: string = null;
  clave: string = null;

  constructor( public route: Router,
               private alertas: AlertasService ) { }

  ngOnInit() {
  }

  loginMethod(){
    console.log(this.usuario);
    console.log(this.clave);

    this.alertas.presentaLoading('Espere x favor...');

    this.route.navigate(['/inicio']);
    this.alertas.loadingDissmiss();

/**
 * 
    this.usuariosService.syngGetUsersToPromise(this.usuario, this.clave).then(
      resp => {
        this.alertas.loadingDissmiss();
        if (resp.length > 0){
          console.log(resp);
          if (resp[0].Clave === this.clave){
            this.usuariosService.usuario = resp[0];
            this.route.navigate(['/inicio']);
          } else {
            this.alertas.message('ERROR', 'Usuario o clave incorrectos.');
          }
        } else {
          this.alertas.message('ERROR', 'Usuario o clave incorrectos.');
        }
      }, error => {
        this.alertas.loadingDissmiss();
        this.alertas.message('Error', `No se puede acceder a la BD. ${error.message}`);
      }
    )
 */

    //this.route.navigate(['/inicio']);
  }

}
