import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { Proveedores } from 'src/app/models/proveedores';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ListaProveedoresPage } from '../lista-proveedores/lista-proveedores.page';
import { ListaArticulosPage } from '../lista-articulos/lista-articulos.page';
import { Articulos } from 'src/app/models/articulos';
interface PostArticulos {
  articulo:Articulos,
  PAL:number,
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
subTotal: number = 0;
total: number = 0;
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
  this.articulosService.articulosProveedor = [];
  this.articulosService.syncGetArticulos(this.proveedor.ID)

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
    this.total = 0;
    this.subTotal = 0;
this.proveedor = null;
this.proveedoresService.proveedores = [];
this.articulosService.articulos = [];
this.articulosService.articulosProveedor = [];
this.articulosService.articulosPostArray = [];
}
  

setPals($event, articulo:PostArticulos){

  let value = $event.target.value;
  console.log($event, value)
}

setCajas($event, articulo:PostArticulos){

  let value = $event.target.value;
  this.subTotal = 0;
  this.total = 0;
  articulo.Total = 0;
  articulo.Total =  articulo.articulo.ULT_PREC_UNITARIO * value;

  for(let i =0; i< this.articulosService.articulosPostArray.length; i++){

       this.subTotal += this.articulosService.articulosPostArray[i].Total
       this.total += this.articulosService.articulosPostArray[i].Total
  }
}
}
