import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedoresService } from '../../services/proveedores.service';
import { AlertasService } from '../../services/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  image = '../assets/islena.png';
  showPass = false;
  usuario: string = '';
  clave: string = '';

  constructor( public route: Router,
               private usuariosService: UsuariosService,
               private alertas: AlertasService ) { }

  ngOnInit() {
  }

  loginMethod(){
    console.log(this.usuario);
    console.log(this.clave);
this.usuariosService.usuario = null;
    this.alertas.presentaLoading('Espere x favor...');
    this.usuariosService.syngGetUsersToPromise(this.usuario).then(
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

    //this.route.navigate(['/inicio']);
  }

}
