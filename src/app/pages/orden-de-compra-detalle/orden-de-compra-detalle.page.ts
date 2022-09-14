import { Component, Input, OnInit } from '@angular/core';
import { Lineas } from 'src/app/models/lineas';
import { LineasService } from 'src/app/services/lineas.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { OrdenCompra } from 'src/app/models/ordencompra';

@Component({
  selector: 'app-orden-de-compra-detalle',
  templateUrl: './orden-de-compra-detalle.page.html',
  styleUrls: ['./orden-de-compra-detalle.page.scss'],
})
export class OrdenDeCompraDetallePage implements OnInit {
@Input() ordenCompra:OrdenCompra
@Input() lineas:Lineas[]
textoBuscar ='';

  constructor(
public lineasService: LineasService,
public modalCtrl:ModalController,
public popOverCtrl: PopoverController


  ) { }

  ngOnInit() {
console.log(this.ordenCompra)

    
  }


        
  cerrarModal(){

    this.modalCtrl.dismiss();
  }
  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }

   
}
