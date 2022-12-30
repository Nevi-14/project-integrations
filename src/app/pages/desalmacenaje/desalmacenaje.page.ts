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

      resp.forEach(articulo => {


        const i = this.desalmacenajeService.articulosDesalmacenados.findIndex(a => a.ARTICULO == articulo.ARTICULO);

        if (i >= 0) {
          this.desalmacenajeService.articulosDesalmacenados[i].nuevo = false;
          this.desalmacenajeService.articulosDesalmacenados[i].CANTIDAD_DESALMACENADA = articulo.CANTIDAD_DESALMACENADA;
          this.desalmacenajeService.articulosDesalmacenados[i].SALDO = articulo.SALDO;

        } else {
          articulo.nuevo = false;
          this.desalmacenajeService.articulosDesalmacenados.push(articulo);
        }

        console.log(this.desalmacenajeService.articulosDesalmacenados)

      })


    })
  }
  cerrarModal() {

    this.modalCtrl.dismiss();


  }
  agregarArticulo($event, articulo: any) {

    const cantidad = $event.detail.value;
    this.desalmacenajeService.agregarActualizarArticulo(articulo.articulo, cantidad);

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
