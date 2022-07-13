import { Component, OnInit } from '@angular/core';
import { BodegasService } from 'src/app/services/bodegas.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lista-bodegas',
  templateUrl: './lista-bodegas.page.html',
  styleUrls: ['./lista-bodegas.page.scss'],
})
export class ListaBodegasPage implements OnInit {
  textoBuscar = '';
  constructor(
    public bodegasService: BodegasService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.bodegasService.syncGetProvedores();
  }
  retornarBodega(bodega){
    this.modalCtrl.dismiss({
      bodega:bodega
    })
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
}
