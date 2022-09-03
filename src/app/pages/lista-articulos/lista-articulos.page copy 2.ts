import { Component, OnInit } from '@angular/core';
import { IonGrid, ModalController } from '@ionic/angular';
import { Articulos } from 'src/app/models/articulos';
import { AlertasService } from 'src/app/services/alertas.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { Lineas } from '../../models/lineas';
interface PostArticulos {
  articulo:Lineas,
  Unidades:number,
  Cajas:number,
  Total: number,
  precioDescuento:number,
  montoImpuesto: number
}
@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.page.html',
  styleUrls: ['./lista-articulos.page.scss'],
})
export class ListaArticulosPage implements OnInit {
   articuloPostArray: PostArticulos = {
    articulo : {
      ORDEN_COMPRA: null,
      ORDEN_COMPRA_LINEA: 1,
      ARTICULO: null,
      BODEGA: null,
      DESCRIPCION: null,
      CANTIDAD_ORDENADA: 1,
      CANTIDAD_EMBARCADA: 0,
      CANTIDAD_RECIBIDA: 0,
      CANTIDAD_RECHAZADA: 0,
      PRECIO_UNITARIO: null,
      IMPUESTO1: 0,
      IMPUESTO2: 0,
      PORC_DESCUENTO: 0,
      MONTO_DESCUENTO: 0,
      FACTOR_CONVERSION: null,
      CENTRO_COSTO: "001-001-01-01",
      CUENTA_CONTABLE: "00003",
      TIPO_IMPUESTO1: "01",
      TIPO_TARIFA1: "08",
      LOTE :null
  },
    Unidades:1,
    Cajas:1,
    Total: 0,
    precioDescuento:0,
    montoImpuesto: 0

}
  textoBuscar = '';
  
  fecha = new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';

  constructor(
    public modalCtrl: ModalController,
    public articulosService:ArticulosService,
    public alertasService:AlertasService
  ) { }

  ngOnInit() {

  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }


  retornarArticulo(articulo){
    this.modalCtrl.dismiss({
      articulo:articulo
    })

  }
  agregarArticulo(articulo:Articulos){


    if( !articulo.SELECTED ){

    
  let articuloPostArray: PostArticulos = {
      articulo : {
        ORDEN_COMPRA: null,
        ORDEN_COMPRA_LINEA: 1,
        ARTICULO: articulo.ARTICULO,
        BODEGA: null,
        DESCRIPCION: articulo.DESCRIPCION,
        CANTIDAD_ORDENADA: 1,
        CANTIDAD_EMBARCADA: 0,
        CANTIDAD_RECIBIDA: 0,
        CANTIDAD_RECHAZADA: 0,
        PRECIO_UNITARIO: articulo.ULT_PREC_UNITARIO,
        IMPUESTO1: 0,
        IMPUESTO2: 0,
        PORC_DESCUENTO: 0,
        MONTO_DESCUENTO: 0,
        FACTOR_CONVERSION: articulo.FACTOR_CONVERSION,
        CENTRO_COSTO: "001-001-01-01",
        CUENTA_CONTABLE: "00003",
        TIPO_IMPUESTO1: "01",
        TIPO_TARIFA1: "08",
        LOTE :null
    },
      Unidades:1,
      Cajas:1,
      Total: articulo.ULT_PREC_UNITARIO * 1,
      precioDescuento:0,
      montoImpuesto: 0

  }


  return
  
  this.articulosService.articulosPostArray.push(articuloPostArray);
  this.articulosService.subTotal += articuloPostArray.Total
  this.articulosService.total += articuloPostArray.Total
  
      this.alertasService.message('ISLEÑA', 'Articulo ' + articulo.ARTICULO +' '+'se agrego a la lista');
    }else{
 
      let i =  this.articulosService.articulosPostArray.findIndex(art => art.articulo.ARTICULO == articulo.ARTICULO)
    if(i >=0){
      this.articulosService.articulosPostArray.splice(i,1);
      this.alertasService.message('ISLEÑA', 'Articulo ' + articulo.ARTICULO +' '+'se elimino de la lista');
    }

    
    }
  	console.log(  this.articulosService.articulosPostArray);//it is working !!!

  }

  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }


}
