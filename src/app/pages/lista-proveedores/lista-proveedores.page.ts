import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Proveedores } from 'src/app/models/proveedores';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.page.html',
  styleUrls: ['./lista-proveedores.page.scss'],
})
export class ListaProveedoresPage implements OnInit {
  textoBuscar = '';
  constructor(
    public proveedoresService: ProveedoresService,
    public modalCtrl: ModalController

  ) { }

  ngOnInit() {

  
console.log(localStorage.getItem('proveedores'), 'provedores storage');
    if(localStorage.getItem('proveedores')){
      this.proveedoresService.proveedores = JSON.parse(localStorage.getItem('proveedores'));

      return
     // this.proveedoresService.syncGetProvedores('');
    }
    this.proveedoresService.syncGetProvedores('');
  }
  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
  cerrarModal(){
    this.modalCtrl.dismiss();
      }
  retornarProvedor(proveedor:Proveedores){
    this.modalCtrl.dismiss({
      proveedor:proveedor
    })
  }

}
