import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedoresService } from '../../services/proveedores.service';
import { AlertasService } from '../../services/alertas.service';

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
               private provServices: ProveedoresService,
               private alertas: AlertasService ) { }

  ngOnInit() {
  }

  loginMethod(){
    console.log(this.usuario);
    console.log(this.clave);

    this.alertas.presentaLoading('Espere x favor...');
    this.provServices.getUsers(this.usuario).subscribe(
      resp => {
        this.alertas.loadingDissmiss();
        if (resp.length > 0){
          console.log(resp);
          if (resp[0].Clave === this.clave){
            this.route.navigate(['/inicio']);
          } else {
            this.alertas.message('ERROR', 'Usuario o clave incorrectos.');
          }
        } else {
          this.alertas.message('ERROR', 'Usuario o clave incorrectos.');
        }
      }, error => {
        this.alertas.loadingDissmiss();
        this.alertas.message('Error', 'No se puede acceder a la BD');
      }
    )

    //this.route.navigate(['/inicio']);
  }

}
