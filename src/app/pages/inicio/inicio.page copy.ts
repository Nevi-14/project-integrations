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
import { OrdenCompra } from 'src/app/models/ordencompra';
import { Bodegas } from 'src/app/models/bodegas';
import { Lineas } from 'src/app/models/lineas';
interface PostArticulos {
  articulo:Lineas,
  Unidades:number,
  Cajas:number,
  Total: number,
  precioDescuento:number
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
ordenCompra:OrdenCompra =
{
  ORDEN_COMPRA: null,
  USUARIO: null,
  PROVEEDOR: null,
  BODEGA: null,
  CONDICION_PAGO: null,
  MONEDA: null,
  PAIS: null,
  MODULO_ORIGEN:null,
  FECHA: null,
  FECHA_REQUERIDA: null,
  TIPO_DESCUENTO: null,
  PORC_DESCUENTO: null,
  MONTO_DESCUENTO: null,
  TOTAL_MERCADERIA: null,
  TOTAL_IMPUESTO1: null,
  TOTAL_IMPUESTO2: null,
  MONTO_FLETE: null,
  MONTO_SEGURO: null,
  MONTO_DOCUMENTACIO:null,
  MONTO_ANTICIPO: null,
  TOTAL_A_COMPRAR: null,
}
proveedor:Proveedores;
bodega:Bodegas;
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
  this.rellenarOrdenCompra(data.proveedor);
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
    console.log('bodega', data.bodega)
     this.bodega = data.bodega;
     this.ordenCompra.BODEGA = this.bodega.BODEGA;
   
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
  


setUnidades($event, articulo:PostArticulos){

  let value = $event.target.value;
  this.articulosService.subTotal = 0;
  this.articulosService.total = 0;
  articulo.articulo.CANTIDAD_ORDENADA = 0;
  articulo.articulo.CANTIDAD_ORDENADA = value;
  articulo.Total = 0;
  articulo.Cajas = 0;
  articulo.Cajas = articulo.articulo.CANTIDAD_ORDENADA * articulo.articulo.FACTOR_CONVERSION;
  articulo.Total =  articulo.articulo.CANTIDAD_ORDENADA *   articulo.articulo.PRECIO_UNITARIO ;

  for(let i =0; i< this.articulosService.articulosPostArray.length; i++){

       this.articulosService.subTotal += this.articulosService.articulosPostArray[i].Total
       this.articulosService.total += this.articulosService.articulosPostArray[i].Total
  }
}

setPrecio($event, articulo:PostArticulos){
  let value = $event.target.value;
  this.articulosService.subTotal = 0;
  this.articulosService.total = 0;

  articulo.articulo.PRECIO_UNITARIO = value;
  articulo.Total = 0;
  articulo.Cajas = 0;
  articulo.Cajas = articulo.Unidades * articulo.articulo.FACTOR_CONVERSION;
  articulo.Total =  articulo.Unidades *   articulo.articulo.PRECIO_UNITARIO ;

  for(let i =0; i< this.articulosService.articulosPostArray.length; i++){

       this.articulosService.subTotal += this.articulosService.articulosPostArray[i].Total
       this.articulosService.total += this.articulosService.articulosPostArray[i].Total
  }
  
}
setDescuento($event, articulo:PostArticulos){
  let value = $event.target.value;
  this.articulosService.subTotal = 0;
  this.articulosService.total = 0;
  articulo.articulo.PORC_DESCUENTO = value;
  articulo.Total = 0;
  articulo.Cajas = 0;
  articulo.Cajas = articulo.Unidades * articulo.articulo.FACTOR_CONVERSION;
  articulo.articulo.MONTO_DESCUENTO = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO;
  articulo.Total =  (articulo.Unidades *   articulo.articulo.PRECIO_UNITARIO) -articulo.articulo.MONTO_DESCUENTO ;
  articulo.precioDescuento  = articulo.articulo.PRECIO_UNITARIO - articulo.articulo.MONTO_DESCUENTO
  for(let i =0; i< this.articulosService.articulosPostArray.length; i++){

       this.articulosService.subTotal += this.articulosService.articulosPostArray[i].Total
       this.articulosService.total += this.articulosService.articulosPostArray[i].Total
  }
  
}
setImpuesto($event, articulo:PostArticulos){
  let value = $event.target.value;
  this.articulosService.subTotal = 0;
  this.articulosService.total = 0;

  articulo.articulo.IMPUESTO1 = value;
  articulo.Total = 0;
  articulo.Cajas = 0;
  articulo.Cajas = articulo.Unidades * articulo.articulo.FACTOR_CONVERSION;
let montoImpuesto = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO;
  articulo.Total =  (articulo.Unidades *   articulo.articulo.PRECIO_UNITARIO)- articulo.articulo.MONTO_DESCUENTO + montoImpuesto ;

  for(let i =0; i< this.articulosService.articulosPostArray.length; i++){

       this.articulosService.subTotal += this.articulosService.articulosPostArray[i].Total
       this.articulosService.total += this.articulosService.articulosPostArray[i].Total
  }
  


}

borrarArticulo(index, articulo:PostArticulos){
 let i =  this.articulosService.articulos.findIndex(item => item.ARTICULO == articulo.articulo.ARTICULO);
 this.articulosService.articulos[i].SELECTED = false;
  this.articulosService.subTotal -= articulo.Total
  this.articulosService.total -= articulo.Total
  this.articulosService.articulosPostArray.splice(index,1);
}
rellenarOrdenCompra(proveedor:Proveedores){
this.ordenCompra.ORDEN_COMPRA = 'Sin Definir';
this.ordenCompra.USUARIO = 'SA'
this.ordenCompra.PROVEEDOR = proveedor.ID;
this.ordenCompra.BODEGA = 'Sin Definir';
this.ordenCompra.CONDICION_PAGO = proveedor.CONDICION_PAGO.toString();
this.ordenCompra.MONEDA = proveedor.MONEDA;
this.ordenCompra.PAIS = proveedor.PAIS;
this.ordenCompra.MODULO_ORIGEN = 'CO';
this.ordenCompra.FECHA = new Date().toLocaleDateString();
this.ordenCompra.FECHA_REQUERIDA = new Date().toLocaleDateString();
this.ordenCompra.TIPO_DESCUENTO = 'A';
this.ordenCompra.PORC_DESCUENTO = 0;
this.ordenCompra.MONTO_DESCUENTO = 0;
this.ordenCompra.TOTAL_MERCADERIA = 0;
this.ordenCompra.TOTAL_IMPUESTO1 = 0;
this.ordenCompra.TOTAL_IMPUESTO2 = 0;
this.ordenCompra.MONTO_FLETE = 0;
this.ordenCompra.MONTO_SEGURO = 0;
this.ordenCompra.MONTO_DOCUMENTACIO = 0;
this.ordenCompra.MONTO_ANTICIPO = 0;
this.ordenCompra.TOTAL_A_COMPRAR = 0;



}
}
