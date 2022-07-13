import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { Proveedores } from 'src/app/models/proveedores';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ListaProveedoresPage } from '../lista-proveedores/lista-proveedores.page';
import { ListaArticulosPage } from '../lista-articulos/lista-articulos.page';
import { Articulos } from 'src/app/models/articulos';
import { ListaBodegasPage } from '../lista-bodegas/lista-bodegas.page';
import { OrdenCompraService } from '../../services/ordencompra.service';
interface PostArticulos {
  articulo:Articulos,
  Unidades:number,
  Cajas:number,
  Total: number
}
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
articulos:Articulos[]=[];

  constructor(
    public modalCtrl: ModalController,
    public proveedoresService:ProveedoresService,
    public articulosService: ArticulosService,
    public route: Router,
    public ordenCompraService: OrdenCompraService
  ) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
this.ordenCompraService.syncUltimaOrdenCompra();
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
  this.articulosService.articulosProveedor = [];
  this.articulosService.syncGetArticulos(this.proveedor.ID)

}
    
  }

  async  listaBodegas(){

    let modal = await  this.modalCtrl.create({
   component:ListaBodegasPage,
   cssClass: 'large-modal',
   
       });
       await modal.present();
       const { data } = await modal.onWillDismiss();
   if(data != undefined){
     let bode = data.bodega;
   
   
   }
       
     }
  async  listaArticulos(){

    let modal = await  this.modalCtrl.create({
   component:ListaArticulosPage,
   cssClass: 'large-modal',
   
       });
       await modal.present();

       
     }

  limpiarDatos(){
    this.articulosService.total = 0;
    this.articulosService.subTotal = 0;
this.proveedor = null;
this.proveedoresService.proveedores = [];
this.articulosService.articulos = [];
this.articulosService.articulosProveedor = [];
this.articulosService.articulosPostArray = [];
}
  


setCajas($event, articulo:PostArticulos){

  let value = $event.target.value;
  this.articulosService.subTotal = 0;
  this.articulosService.total = 0;
  articulo.Unidades = 0;
  articulo.Unidades = value;
  articulo.Total = 0;
  articulo.Cajas = 0;
  articulo.Cajas = articulo.Unidades * articulo.articulo.FACTOR_CONVERSION;
  articulo.Total =  articulo.Unidades *   articulo.articulo.ULT_PREC_UNITARIO ;

  for(let i =0; i< this.articulosService.articulosPostArray.length; i++){

       this.articulosService.subTotal += this.articulosService.articulosPostArray[i].Total
       this.articulosService.total += this.articulosService.articulosPostArray[i].Total
  }
}
}
