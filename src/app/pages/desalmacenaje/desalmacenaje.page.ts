import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GestionOrdenesService } from '../../services/gestion-ordenes.service';
import { DesalmacenajeService } from '../../services/desalmacenaje.service';
import { Lineas } from '../../models/lineas copy';
import { ar } from 'date-fns/locale';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-desalmacenaje',
  templateUrl: './desalmacenaje.page.html',
  styleUrls: ['./desalmacenaje.page.scss'],
})
export class DesalmacenajePage implements OnInit {

  textoBuscar = '';
  constructor(

    public modalCtrl: ModalController,
    public gestionOrdenesService: GestionOrdenesService,
    public desalmacenajeService: DesalmacenajeService,
    public alertasService: AlertasService

  ) { }

  ngOnInit() {
    this.cargarDatos();


  }

  cargarDatos() {

    this.desalmacenajeService.syncGetArticulosToPromise(this.gestionOrdenesService.ordenCompra.ORDEN_COMPRA).then(resp => {
      this.desalmacenajeService.articulosDesalmacenados = [];

 
      for(let a =0; a < resp.length;a++){
        const i = this.desalmacenajeService.articulosDesalmacenados.findIndex(ar => ar.ARTICULO == resp[a].ARTICULO);

        if (i >= 0) {
          this.desalmacenajeService.articulosDesalmacenados[i].nuevo = false;
          this.desalmacenajeService.articulosDesalmacenados[i].CANTIDAD_DESALMACENADA = resp[a].CANTIDAD_DESALMACENADA;
          this.desalmacenajeService.articulosDesalmacenados[i].SALDO = resp[a].SALDO;

        } else {
          resp[a].nuevo = false;
          this.desalmacenajeService.articulosDesalmacenados.push(resp[a]);
        }
      
      }


    }, error =>{
 
    })
  }
  cerrarModal() {

    this.modalCtrl.dismiss();


  }
  agregarArticulo($event, articulo: any) {

    const cantidad = $event.detail.value;
    this.desalmacenajeService.agregarActualizarArticulo(articulo.articulo, cantidad);

  }
  obtenerValorCantidadRecibida(articulo){
    const i = this.desalmacenajeService.articulosDesalmacenados.findIndex(a => a.ARTICULO == articulo.articulo.ARTICULO);

    if (i >= 0) {


      return this.desalmacenajeService.articulosDesalmacenados[i].CANTIDAD_RECIBIDA;
    }
  
    return 0;
  }

  actualizarCantidadRecibida($event, articulo){
    const cantidad = $event.detail.value;
    const i = this.desalmacenajeService.articulosDesalmacenados.findIndex(a => a.ARTICULO == articulo.articulo.ARTICULO);

    if (i >= 0) {


      return this.desalmacenajeService.articulosDesalmacenados[i].CANTIDAD_RECIBIDA = cantidad;
    }
    articulo.articulo.CANTIDAD_RECIBIDA = cantidad;
  }
  obtenerValor(articulo) {


    const i = this.desalmacenajeService.articulosDesalmacenados.findIndex(a => a.ARTICULO == articulo.articulo.ARTICULO);

    if (i >= 0) {


      return this.desalmacenajeService.articulosDesalmacenados[i].CANTIDAD_DESALMACENADA;
    }
    return 0;
  }

  async generarPost() {


    this.alertasService.presentaLoading('Guardando datos...');

    const postArray = [];

    for (let i = 0; i < this.desalmacenajeService.articulosDesalmacenados.length; i++) {

      this.desalmacenajeService.articulosDesalmacenados[i].SALDO = this.desalmacenajeService.articulosDesalmacenados[i].CANTIDAD_RECIBIDA - this.desalmacenajeService.articulosDesalmacenados[i].CANTIDAD_DESALMACENADA;

      if (this.desalmacenajeService.articulosDesalmacenados[i].nuevo) {

        postArray.push(this.desalmacenajeService.articulosDesalmacenados[i])

      } else {
        await this.desalmacenajeService.syncPutArticulo(this.desalmacenajeService.articulosDesalmacenados[i]).then(resp => {


        }, error => {

          this.alertasService.loadingDissmiss();
        })

      }

      if (i == this.desalmacenajeService.articulosDesalmacenados.length - 1) {

        await this.desalmacenajeService.syncPostArticulos(postArray).then(resp => {

          this.alertasService.loadingDissmiss();


          this.cargarDatos();

        }, error => {

          this.alertasService.loadingDissmiss();
        })
      }
    }


  }

}
