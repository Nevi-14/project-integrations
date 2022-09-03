import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonGrid, ModalController } from '@ionic/angular';
import { Articulos } from 'src/app/models/articulos';
import { AlertasService } from 'src/app/services/alertas.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { Lineas } from '../../models/lineas';
import { DetallePage } from '../detalle/detalle.page';
interface PostArticulos {
  articulo:Lineas,
  Unidades:number,
  Cajas:number,
  Total: number,
  precioDescuento:number,
  montoImpuesto: number,
  accion:string
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
      PRECIO_UNITARIO: 0,
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
    montoImpuesto: 0,
    accion:'I',

}
  textoBuscar = '';
  
  fecha = new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';

  constructor(
    public modalCtrl: ModalController,
    public articulosService:ArticulosService,
    public alertasService:AlertasService,
    private cdr: ChangeDetectorRef
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

  agregarArticulo(){
    this.articulosService.articulosPostArray.push(this.articuloPostArray);
    this.articulosService.subTotal += this.articuloPostArray.Total
    this.articulosService.total += this.articuloPostArray.Total
    
    this.modalCtrl.dismiss({
      articulo:this.articuloPostArray.articulo
    })

  }
  seccionarArticulo(articulo:Articulos){

    
this.articuloPostArray.articulo.CANTIDAD_ORDENADA = 1;
this.articuloPostArray.articulo.ARTICULO = articulo.ARTICULO;
this.articuloPostArray.articulo.DESCRIPCION = articulo.DESCRIPCION;
this.articuloPostArray.articulo.PRECIO_UNITARIO = articulo.ULT_PREC_UNITARIO;
this.articuloPostArray.articulo.CANTIDAD_ORDENADA = articulo.FACTOR_CONVERSION;

this.articuloPostArray.Total = this.articuloPostArray.articulo.PRECIO_UNITARIO * this.articuloPostArray.articulo.CANTIDAD_ORDENADA;
}

  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
      actualizarValores(){

        if(this.articuloPostArray.articulo.PRECIO_UNITARIO > 0 && this.articuloPostArray.articulo.CANTIDAD_ORDENADA > 0) {
          this.articuloPostArray.Total = Number(this.articuloPostArray.articulo.CANTIDAD_ORDENADA) * Number(this.articuloPostArray.articulo.PRECIO_UNITARIO);
          this.articuloPostArray.articulo.MONTO_DESCUENTO = this.articuloPostArray.articulo.PORC_DESCUENTO *  this.articuloPostArray.articulo.PRECIO_UNITARIO / 100;
          this.articuloPostArray.montoImpuesto = this.articuloPostArray.articulo.IMPUESTO1 *  this.articuloPostArray.articulo.PRECIO_UNITARIO / 100;
          this.articuloPostArray.precioDescuento =  this.articuloPostArray.articulo.PRECIO_UNITARIO - this.articuloPostArray.articulo.MONTO_DESCUENTO;
          this.cdr.detectChanges();
          console.log(this.articuloPostArray)
        }
   
      }

}
