import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaisesContientesSoftland } from 'src/app/models/paisescontientes';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { Ordenes } from '../../models/ordenes';
import { OrdenCompra } from '../../models/ordencompra copy';
import { AlertasService } from '../../services/alertas.service';
import { OrdenComprasInternacionales } from 'src/app/models/ordenesComprasInternacionales';

@Component({
  selector: 'app-ordenes-internacionales',
  templateUrl: './ordenes-internacionales.page.html',
  styleUrls: ['./ordenes-internacionales.page.scss'],
})
export class OrdenesInternacionalesPage implements OnInit {
@Input() estado:string;
paises: PaisesContientesSoftland[];
ordenes:OrdenComprasInternacionales[];
textoBuscar = '';
  constructor(
public modalCtrl:ModalController,
public localizacionService: LocalizacionService,
public alertasService: AlertasService

  ) { }

  ngOnInit() {
    this.alertasService.loadingDissmiss();
    console.log('ordenes',this.ordenes)
    this.localizacionService.syncPaisesContinentesToPromise().then(paises=>{
      this.paises = paises;
      console.log('paises', paises)
      });
  }
  rellenarArregloMapa(array:OrdenCompra){


  }

  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
  cerrarModal(){

this.modalCtrl.dismiss();
  }

}
