import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetButton, ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
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
import { AlertasService } from 'src/app/services/alertas.service';
import { CalendarioPopoverPage } from '../calendario-popover/calendario-popover.page';
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
fecha: Date = new Date();
date = this.fecha.getDate();
month = this.fecha.getMonth();
year = this.fecha.getFullYear();
image = '../assets/islena.png';
box = '../assets/supply-chain.svg';
textoBuscar = '';
articulos:Articulos[]=[];

  constructor(
    public modalCtrl: ModalController,
    public proveedoresService:ProveedoresService,
    public articulosService: ArticulosService,
    public route: Router,
    public ordenCompraService: OrdenCompraService,
    public alertasService: AlertasService,
    public popOverCtrl: PopoverController
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
  this.rellenarOrdenCompra(data.proveedor);
  this.articulosService.syncGetArticulos(this.proveedor.ID)

}
    
  }

  async  listaBodegas(){
    if(!this.proveedor){
      this.alertasService.message('ISLEÑA','Seleccionar Proveedor')
            return
          }
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

    if(!this.bodega){
this.alertasService.message('ISLEÑA','Seleccionar Bodega')
      return
    }
    let modal = await  this.modalCtrl.create({
   component:ListaArticulosPage,
   cssClass: 'large-modal',
   
       });
       await modal.present();
       const { data } = await modal.onWillDismiss();
       this.ordenCompra.TOTAL_A_COMPRAR  =  this.articulosService.total
       this.sumarTotales();
       
       
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
  
async presentPopover(articulo:PostArticulos) {
  const popover = await this.popOverCtrl.create({
    component: CalendarioPopoverPage,
    cssClass: 'my-custom-class',
    translucent: true,
    componentProps : {
      fecha:articulo.articulo.FECHA_REQUERIDA 
    }
  });
  await popover.present();

  const { data } = await popover.onDidDismiss();

  if(data != undefined){
   
    let fecha= new Date(data.fecha).toLocaleDateString('Es', {
      year: 'numeric',
      month: '2-digit',
      weekday: 'short',
      day: 'numeric',
    });
   articulo.articulo.FECHA_REQUERIDA = data.fecha;

  }
}

formatDate(date:Date){

return date.toLocaleDateString()
}

setPrecio($event, articulo:PostArticulos){
  let value = $event.target.value;

  this.articulosService.subTotal = 0;
  this.articulosService.total = 0;

  articulo.articulo.PRECIO_UNITARIO = Number(value);
  articulo.Total = 0;
  articulo.Cajas = 0;
  articulo.Cajas = articulo.Unidades * articulo.articulo.FACTOR_CONVERSION;
  articulo.articulo.MONTO_DESCUENTO = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO;
  articulo.precioDescuento  = articulo.articulo.PRECIO_UNITARIO - articulo.articulo.MONTO_DESCUENTO
  // actualizamos monto descuento 
  articulo.articulo.MONTO_DESCUENTO = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO;
    // actualizamos precio descuento 
    articulo.precioDescuento  = articulo.articulo.PRECIO_UNITARIO - articulo.articulo.MONTO_DESCUENTO
  // actualizamos total
  let montoImpuesto = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.IMPUESTO1;
  articulo.Total =  (articulo.articulo.CANTIDAD_ORDENADA *   articulo.articulo.PRECIO_UNITARIO) - (articulo.articulo.MONTO_DESCUENTO * articulo.articulo.CANTIDAD_ORDENADA) + montoImpuesto ;
  this.sumarTotales();

this.sumarTotales();
  
}

setFlete($event){

  if(!this.proveedor){
    this.ordenCompra.MONTO_FLETE = 0;
    this.alertasService.message('ISLEÑA','Seleccionar proveedor')
          return
        }
  let value = $event.target.value;


 this.ordenCompra.MONTO_FLETE = Number(value);



this.sumarTotales();
  

}

setSeguro($event){
  if(!this.proveedor){
    this.ordenCompra.MONTO_SEGURO = 0;
    this.alertasService.message('ISLEÑA','Seleccionar proveedor')
          return
        }
let value = $event.target.value;
this.ordenCompra.MONTO_SEGURO = Number(value);
this.sumarTotales();
  

}
setAnticipo($event){
  if(!this.proveedor){
    this.ordenCompra.MONTO_ANTICIPO = 0;
    this.alertasService.message('ISLEÑA','Seleccionar proveedor')
          return
        }
  let value = $event.target.value;
  this.ordenCompra.MONTO_ANTICIPO = Number(value);
  this.sumarTotales();
    
  
  }
sumarTotales(){
  this.articulosService.subTotal = 0;
  this.articulosService.total = 0;
  this.ordenCompra.TOTAL_MERCADERIA = 0;
  this.ordenCompra.TOTAL_IMPUESTO1 = 0;
  this.ordenCompra.TOTAL_A_COMPRAR = 0;
  this.articulosService.total +=this.ordenCompra.MONTO_FLETE;
  this.articulosService.total += this.ordenCompra.MONTO_SEGURO;
  this.ordenCompra.TOTAL_A_COMPRAR  =  this.articulosService.total
  for(let i =0; i< this.articulosService.articulosPostArray.length; i++){
    
    this.articulosService.articulosPostArray[i].articulo.BODEGA = this.ordenCompra.BODEGA
   
    this.articulosService.subTotal += this.articulosService.articulosPostArray[i].Total
    this.articulosService.total += this.articulosService.articulosPostArray[i].Total
    this.ordenCompra.TOTAL_MERCADERIA +=Number( this.articulosService.articulosPostArray[i].articulo.CANTIDAD_ORDENADA);
    this.ordenCompra.TOTAL_IMPUESTO1 += Number(this.articulosService.articulosPostArray[i].Unidades) * (this.articulosService.articulosPostArray[i].articulo.PRECIO_UNITARIO / 100) *this.articulosService.articulosPostArray[i].articulo.IMPUESTO1;
    if(i == this.articulosService.articulosPostArray.length -1){

     this.ordenCompra.TOTAL_A_COMPRAR  =  this.articulosService.total
     
 }


}
}

setUnidades($event, articulo:PostArticulos){

  let value = $event.target.value;
  this.articulosService.subTotal = 0;
  this.articulosService.total = 0;
  articulo.articulo.CANTIDAD_ORDENADA = 0;
  articulo.articulo.CANTIDAD_ORDENADA = Number(value);
  articulo.Total = 0;
  articulo.Cajas = 0;
  articulo.Cajas = articulo.articulo.CANTIDAD_ORDENADA * articulo.articulo.FACTOR_CONVERSION;
  // actualizamos monto descuento 
  articulo.articulo.MONTO_DESCUENTO = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO;
    // actualizamos precio descuento 
    articulo.precioDescuento  = articulo.articulo.PRECIO_UNITARIO - articulo.articulo.MONTO_DESCUENTO
  // actualizamos total
  let montoImpuesto = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.IMPUESTO1;
  articulo.Total =  (articulo.articulo.CANTIDAD_ORDENADA *   articulo.articulo.PRECIO_UNITARIO) - (articulo.articulo.MONTO_DESCUENTO * articulo.articulo.CANTIDAD_ORDENADA) + montoImpuesto ;

  this.sumarTotales();
}



setDescuento($event, articulo:PostArticulos){
  let value = $event.target.value;
  this.articulosService.subTotal = 0;
  this.articulosService.total = 0;
 
  articulo.articulo.PORC_DESCUENTO = Number(value);
  articulo.Total = 0;
  articulo.Cajas = 0;
  articulo.Cajas = articulo.Unidades * articulo.articulo.FACTOR_CONVERSION;
  articulo.articulo.MONTO_DESCUENTO = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO;
  articulo.precioDescuento  = articulo.articulo.PRECIO_UNITARIO - articulo.articulo.MONTO_DESCUENTO
  // actualizamos monto descuento 
  articulo.articulo.MONTO_DESCUENTO = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO;
    // actualizamos precio descuento 
    articulo.precioDescuento  = articulo.articulo.PRECIO_UNITARIO - articulo.articulo.MONTO_DESCUENTO
  // actualizamos total
  let montoImpuesto = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.IMPUESTO1;
  articulo.Total =  (articulo.articulo.CANTIDAD_ORDENADA *   articulo.articulo.PRECIO_UNITARIO) - (articulo.articulo.MONTO_DESCUENTO * articulo.articulo.CANTIDAD_ORDENADA) + montoImpuesto ;
  this.sumarTotales();
  
}
setImpuesto($event, articulo:PostArticulos){
  let value = $event.target.value;
  this.articulosService.subTotal = 0;
  this.articulosService.total = 0;

  articulo.articulo.IMPUESTO1 = Number(value);
  articulo.Total = 0;
  articulo.Cajas = 0;
  articulo.Cajas = articulo.Unidades * articulo.articulo.FACTOR_CONVERSION;
  // actualizamos monto descuento 
  articulo.articulo.MONTO_DESCUENTO = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO;
    // actualizamos precio descuento 
    articulo.precioDescuento  = articulo.articulo.PRECIO_UNITARIO - articulo.articulo.MONTO_DESCUENTO
  // actualizamos total
  let montoImpuesto = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.IMPUESTO1;
  articulo.Total =  (articulo.articulo.CANTIDAD_ORDENADA *   articulo.articulo.PRECIO_UNITARIO) - (articulo.articulo.MONTO_DESCUENTO * articulo.articulo.CANTIDAD_ORDENADA) + montoImpuesto ;
  this.sumarTotales();
  


}

borrarArticulo(index, articulo:PostArticulos){
 let i =  this.articulosService.articulos.findIndex(item => item.ARTICULO == articulo.articulo.ARTICULO);
 this.articulosService.articulos[i].SELECTED = false;
  this.articulosService.subTotal -= articulo.Total
  this.articulosService.total -= articulo.Total
  this.ordenCompra.TOTAL_A_COMPRAR   -= articulo.Total;
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



generarPost(){

/**
 *   if(!this.proveedor || !this.bodega || !this.ordenCompra || this.articulosService.articulosPostArray.length == 0){
this.alertasService.message('ISLEÑA','La orden de compra no se encuentra completa aun.')
    return
  }
 */
  this.alertasService.presentaLoading('Generando Consecutivo')
  this.ordenCompraService.syncUltimaOrdenCompraToPromise().then(resp =>{
    this.ordenCompraService.ultimaOrdenCompra = resp[0];
  this.ordenCompra.ORDEN_COMPRA =   this.nextConsecutivo(this.ordenCompraService.ultimaOrdenCompra.ULT_ORDEN_COMPRA)
    console.log('consecutivo',this.ordenCompraService.ultimaOrdenCompra.ULT_ORDEN_COMPRA);
    console.log('orden de compra',this.ordenCompra);
    console.log('productos',this.articulosService.articulosPostArray);
    this.alertasService.loadingDissmiss();

  }, error =>{
    console.log('error',error);
    this.alertasService.loadingDissmiss();
  });

}

nextConsecutivo( consecutivoAnterior){
  let consecutivo: number = 0;
  let arreglo: string;
  let preArreglo: string;
  let tamDigitos: number = 6;
  let nuevoConsecutivo  = '';

  arreglo = '';
  preArreglo = consecutivoAnterior.slice(0,2);
  consecutivo = +consecutivoAnterior.slice(2) + 1;
  for (let i = 0; i < tamDigitos - consecutivo.toString().length; i++) {
    arreglo = arreglo + '0';
  }
  return nuevoConsecutivo = preArreglo + arreglo + consecutivo.toString()
 
}
}
