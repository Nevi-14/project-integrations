import { Component, Input, OnInit } from '@angular/core';
import { OrdenCompraService } from 'src/app/services/ordencompra.service';
import { ModalController } from '@ionic/angular';
import { OrdenCompra } from '../../models/ordencompra';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-ordenes-de-compra',
  templateUrl: './ordenes-de-compra.page.html',
  styleUrls: ['./ordenes-de-compra.page.scss'],
})
export class OrdenesDeCompraPage implements OnInit {
  textoBuscar = '';
  @Input() estado: string
  constructor(
    public ordenescompraservice: OrdenCompraService,
    public modalCtrl:ModalController,
    public proveedoresService: ProveedoresService
  ) { }

  ngOnInit(

  ) {
    
console.log('this.proveedoresService.proveedores',this.proveedoresService.proveedores)
    this.ordenescompraservice.syncGetOrdenesCompraEstado(this.estado);

    
  }
  proveedor(ID){


      let i = this.proveedoresService.proveedores.findIndex(provedor => provedor.ID == ID);
      if(i >=0){
        return this.proveedoresService.proveedores[i].NOMBRE
      }
    
       

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
