import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { Proveedores } from 'src/app/models/proveedores';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ListaProveedoresPage } from '../lista-proveedores/lista-proveedores.page';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
proveedor:Proveedores;
today: Date = new Date();
date = this.today.getDate();
month = this.today.getMonth();
year = this.today.getFullYear();
image = '../assets/islena.png';
box = '../assets/supply-chain.svg';
textoBuscar = '';
  constructor(
    public modalCtrl: ModalController,
    public proveedoresService:ProveedoresService,
    public articulosService: ArticulosService,
    public route: Router
  ) { }

  ngOnInit() {

  }
  ionViewWillEnter(){

    this.limpiarDatos();
  }
  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
  salir(){
    this.route.navigate(['/inicio-sesion']);
  }

 async  listaProveedores(){

 let modal = await  this.modalCtrl.create({
component:ListaProveedoresPage,
cssClass: 'large-modal',

    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
if(data != undefined){
  this.proveedor = data.proveedor;
  console.log(data.proveedor, 'retorn')
  this.articulosService.syncGetArticulos(this.proveedor.ID)

}
    
  }


  limpiarDatos(){
this.proveedor = null;
this.proveedoresService.proveedores = [];
this.articulosService.articulos = [];
}
  
}
