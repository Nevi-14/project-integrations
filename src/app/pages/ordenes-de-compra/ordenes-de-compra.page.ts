import { Component, OnInit } from '@angular/core';
import { OrdenCompraService } from 'src/app/services/ordencompra.service';
import { ModalController } from '@ionic/angular';
import { OrdenCompra } from '../../models/ordencompra';

@Component({
  selector: 'app-ordenes-de-compra',
  templateUrl: './ordenes-de-compra.page.html',
  styleUrls: ['./ordenes-de-compra.page.scss'],
})
export class OrdenesDeCompraPage implements OnInit {
  textoBuscar = '';
  constructor(
    public ordenescompraservice: OrdenCompraService,
    public modalCtrl:ModalController
  ) { }

  ngOnInit(

  ) {

    this.ordenescompraservice.syncGetOrdenesCompraEstado('A');

    
  }
  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
      cerrarModal(){
        this.modalCtrl.dismiss();
      }
    
    
      retornarOrden(orden:OrdenCompra){
        this.modalCtrl.dismiss({
          orden:orden
        })
    
      }
}
