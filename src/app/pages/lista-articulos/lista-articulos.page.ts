import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonGrid, ModalController } from '@ionic/angular';
import { Articulos } from 'src/app/models/articulos';
import { AlertasService } from 'src/app/services/alertas.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { Lineas } from '../../models/lineas';
import { DetallePage } from '../detalle/detalle.page';
import { GestionOrdenesService } from '../../services/gestion-ordenes.service';
interface PostArticulos {
  articulo:Lineas,
  nombre:string,
  cajas:number,
  totalDescuento:number,
  totalImpuesto:number,
  montoSubTotal:number
  montoTotal: number,
  accion:string,
  selected:boolean
}
@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.page.html',
  styleUrls: ['./lista-articulos.page.scss'],
})
export class ListaArticulosPage implements OnInit {
  articulo: PostArticulos
   articuloPostArray: PostArticulos;
montoImpuesto = 0;
  textoBuscar = '';
  selected = null;
  included = false;
  articuloIndex = null;
  fecha = new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';

  constructor(
    public modalCtrl: ModalController,
    public articulosService:ArticulosService,
    public alertasService:AlertasService,
    private cdr: ChangeDetectorRef,
    public gestionOrdenesService: GestionOrdenesService
  ) { }

  ngOnInit() {
 
    if(this.articulo){

      let i =  this.articulosService.articulos.findIndex(item => item.ARTICULO == this.articulo.articulo.ARTICULO);
      if(i >=0){
        this.selected = i;
        this.articuloPostArray =  this.articulo;
        console.log('input2', this.articulo)
      }
    }
   
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }


  retornarArticulo(articulo, index){
    this.modalCtrl.dismiss({
      articulo:articulo
    })
    
  }

  productInArray(id){
    let i =  this.gestionOrdenesService.articulos.findIndex(item => item.articulo.ARTICULO == id);
    if(i >=0){

     return true;
    }

  }
  actualizarValores(){

    if(this.articuloPostArray.articulo.PRECIO_UNITARIO  <= 0  ){

      this.articuloPostArray.articulo.PRECIO_UNITARIO  = 0
      this.articuloPostArray.articulo.PORC_DESCUENTO = 0;
      this.articuloPostArray.articulo.MONTO_DESCUENTO = 0;
      this.articuloPostArray.articulo.IMPUESTO1 = 0;
    
      this.articuloPostArray.totalDescuento = 0;
      this.articuloPostArray.montoSubTotal = 0;
      this.articuloPostArray.montoTotal = 0;
      this.articuloPostArray.totalImpuesto = 0;
    
      this.alertasService.message('DIONE', 'El precio debe de ser mayor a 0')
      return
    
    }
    if( this.articuloPostArray.articulo.CANTIDAD_ORDENADA < 0){
      this.articuloPostArray.articulo.CANTIDAD_ORDENADA = 1;
      this.articuloPostArray.articulo.PORC_DESCUENTO = 0;
      this.articuloPostArray.articulo.MONTO_DESCUENTO = 0
      this.articuloPostArray.articulo.IMPUESTO1 = 0;
    
    
      this.articuloPostArray.totalDescuento = 0;
      this.articuloPostArray.montoSubTotal = 0;
      this.articuloPostArray.montoTotal = 0;
      this.articuloPostArray.totalImpuesto = 0;
    
      this.alertasService.message('DIONE', 'Las unidades deben de ser mayor a 0')
         
    }
    
    if(this.articuloPostArray.articulo.IMPUESTO1  < 0){
      this.articuloPostArray.articulo.IMPUESTO1  = 0
      this.articuloPostArray.totalImpuesto = 0;
      this.alertasService.message('DIONE', 'El impuesto debe de ser mayor a 0')
    }
    
    if(this.articuloPostArray.articulo.PORC_DESCUENTO  < 0){
      this.articuloPostArray.articulo.PORC_DESCUENTO  = 0
      this.articuloPostArray.articulo.MONTO_DESCUENTO = 0
      this.alertasService.message('DIONE', 'El descuento debe de ser mayor a 0')
    
    }else{
      this.articuloPostArray.articulo.MONTO_DESCUENTO =  this.articuloPostArray.articulo.PRECIO_UNITARIO * this.articuloPostArray.articulo.CANTIDAD_ORDENADA;
    this.articuloPostArray.articulo.MONTO_DESCUENTO =   this.articuloPostArray.articulo.MONTO_DESCUENTO  *  this.articuloPostArray.articulo.PORC_DESCUENTO / 100
    }
    

    this.articuloPostArray.montoSubTotal = Number(this.articuloPostArray.articulo.CANTIDAD_ORDENADA) * Number(this.articuloPostArray.articulo.PRECIO_UNITARIO);

    this.articuloPostArray.articulo.MONTO_DESCUENTO =  this.articuloPostArray.articulo.PRECIO_UNITARIO * this.articuloPostArray.articulo.CANTIDAD_ORDENADA;
    this.articuloPostArray.articulo.MONTO_DESCUENTO =   this.articuloPostArray.articulo.MONTO_DESCUENTO  *  this.articuloPostArray.articulo.PORC_DESCUENTO / 100
    this.articuloPostArray.totalDescuento = this.articuloPostArray.articulo.MONTO_DESCUENTO;
    this.articuloPostArray.totalImpuesto =  this.articuloPostArray.articulo.PRECIO_UNITARIO * this.articuloPostArray.articulo.CANTIDAD_ORDENADA;
    this.articuloPostArray.totalImpuesto =   this.articuloPostArray.totalImpuesto  *  this.articuloPostArray.articulo.IMPUESTO1 / 100
   this.articuloPostArray.montoTotal = Number(this.articuloPostArray.articulo.CANTIDAD_ORDENADA) * Number(this.articuloPostArray.articulo.PRECIO_UNITARIO) - this.articuloPostArray.totalDescuento  + this.articuloPostArray.totalImpuesto; 

    this.cdr.detectChanges();
    console.log(this.articuloPostArray)

  }
  agregarArticulo(){


    if(this.articuloPostArray.articulo.PRECIO_UNITARIO <= 0 ){
      this.alertasService.message('DIONE', 'Lo sentimos no se pudo agregar el articulo, el precio debe de ser mayor a 0')
      return
    }
    if(this.articuloPostArray.articulo.CANTIDAD_ORDENADA <= 0 ){
      this.alertasService.message('DIONE', 'Lo sentimos no se pudo agregar el articulo, las unidades deben de ser mayor a 0')
      return
    }
    let i =  this.gestionOrdenesService.articulos.findIndex(item => item.articulo.ARTICULO == this.articuloPostArray.articulo.ARTICULO);
    if(i < 0){
      this.gestionOrdenesService.articulos.push(this.articuloPostArray);
      this.gestionOrdenesService.sumarTotales();
      this.alertasService.message('DIONE', 'El articulo se agrego con Exito');
 
    }else{
      this.gestionOrdenesService.articulos[i] = this.articuloPostArray;
      this.gestionOrdenesService.sumarTotales();
      this.alertasService.message('DIONE', 'El articulo se actualizo con Exito');
    }

    
  } 
  seccionarArticulo(articulos:any, selected){
    this.selected = selected;

    console.log('articulo', articulos)

    let articulo =  {
      articulo  : {
        ORDEN_COMPRA: null,
        ORDEN_COMPRA_LINEA: null,
        ARTICULO: articulos.ARTICULO,
        BODEGA: this.gestionOrdenesService.ordenCompra.BODEGA,
        DESCRIPCION: articulos.DESCRIPCION,
        CANTIDAD_ORDENADA: 1,
        CANTIDAD_EMBARCADA: 0,
        CANTIDAD_RECIBIDA: 0,
        CANTIDAD_RECHAZADA: 0,
        PRECIO_UNITARIO: articulos.ULT_PREC_UNITARIO,
        IMPUESTO1: 0,
        IMPUESTO2: 0,
        PORC_DESCUENTO: 0,
        MONTO_DESCUENTO: 0,
        FACTOR_CONVERSION: Math.round(1 / articulos.FACTOR_CONVERSION),
        CENTRO_COSTO: "001-001-01-01",
        CUENTA_CONTABLE: "00003",
        TIPO_IMPUESTO1: "01",
        TIPO_TARIFA1: "08",
        LOTE :null
    },
    nombre:articulos.DESCRIPCION,
    cajas:0,
    totalDescuento: 0,
    totalImpuesto:0,
    montoSubTotal:articulos.ULT_PREC_UNITARIO*1,
    montoTotal:articulos.ULT_PREC_UNITARIO*1,
      accion:'I',
      selected:false
  
  }

    
   // this.selected = index;
     // this.articuloPostArray.articulo.ARTICULO = articulos.ARTICULO
    let i =  this.gestionOrdenesService.articulos.findIndex(item => item.articulo.ARTICULO == articulo.articulo.ARTICULO);
if(i >=0){
  this.articuloPostArray =  this.gestionOrdenesService.articulos[i];
  console.log('index', i ,articulo, this.gestionOrdenesService.articulos)
  return;
}
this.articuloPostArray = articulo;
  }
  onSearchChange(event){
    this.textoBuscar = event.detail.value;
  }

}
