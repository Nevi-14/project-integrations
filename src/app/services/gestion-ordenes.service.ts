import { Injectable } from '@angular/core';
import { Bodegas } from '../models/bodegas';
import { Lineas } from '../models/lineas';
import { OrdenCompra } from '../models/ordencompra';
import { Proveedores } from '../models/proveedores';
import { AlertasService } from './alertas.service';
import { ArticulosService } from './articulos.service';
import { EmailService } from './email.service';
import { LineasService } from './lineas.service';
import { OrdenCompraService } from './ordencompra.service';
import { ColonesPipe } from 'src/app/pipes/colones.pipe';
import { UsuariosService } from './usuarios.service';
import { LocalizacionService } from 'src/app/services/localizacion.service';


interface email {
  toEmail:string,
  file:string,
  subject:string,
  body:string
}
interface time{
  hour:number,
  minute:number,
  second:number
}
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
@Injectable({
  providedIn: 'root'
})
export class GestionOrdenesService {
  TOTAL_UNIDADES = 0;
  date  =   new Date().getDate();
  month = new Date().getMonth()+1;
  year  =  new Date().getFullYear();
  monedas = [

  { id:0, display: '¢' , value:'CRC'},
  { id:1, display: '$' ,value:'USD'}
  
]
estados = [
  {label:'Planeación',value:'A', checked:false},
  {label:'Por aprobar',value:'B', checked:false},
  {label:'No aprobada',value:'C', checked:false},
  {label:'Transito',value:'E', checked:false},
  {label:'Desalmacenaje',value:'D', checked:false},
  {label:'Liquidada',value:'L', checked:false},
  {label:'Cancelada',value:'X', checked:false},

]
estado = null;
color = '';
moneda = '¢';
bodega:Bodegas;
ordenCompra:OrdenCompra = {
  ORDEN_COMPRA: null,
  USUARIO: this.usuariosService.usuario.UsuarioExactus,
  PROVEEDOR:  null,
  BODEGA:  null,
  CONDICION_PAGO: null,
  MONEDA: null,
  PAIS:  null,
  ESTADO:  'A',
  FECHA:  null,
  FECHA_COTIZACION:  null,
  FECHA_REQUERIDA: null,
  FECHA_EMBARQUE: null,
  FECHA_ARRIBO: null,
  FECHA_APROBACION: null,
  FECHA_DESALMACENAJE: null,
  FECHA_CIERRE: null,
  PORC_DESCUENTO:0,
  MONTO_DESCUENTO:0,
  TOTAL_MERCADERIA:0,
  TOTAL_IMPUESTO1: 0,
  MONTO_FLETE:0,
  MONTO_SEGURO:0,
  MONTO_DOCUMENTACIO:0,
  MONTO_ANTICIPO: 0,
  TOTAL_A_COMPRAR: 0,
  INSTRUCCIONES: null
}
articulos:PostArticulos[]=[]
proveedor:Proveedores;
actualizar:Boolean = false;
fecha = new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';

  constructor(
public alertasService: AlertasService,
public articulosService:ArticulosService,
public emailService: EmailService,
public lineasService: LineasService,
public ordenCompraService: OrdenCompraService,
public usuariosService: UsuariosService,
public localizationService: LocalizacionService

  ) { }

/**
 * 
Importe = precio * unidad
Impuestos (Traslados y Retenciones) = (base * tasa)/100
Subtotal = (suma de importes)
Se redondean el Subtotal y los Impuestos al número de decimales de la moneda
Total = Subtotal - (suma de descuentos) + (suma de impuestos de traslado) - (suma de impuestos de retención)

 * 
 */


actualizarValores(articulos:PostArticulos){
  
  let i = this.articulos.findIndex(item => item.articulo.ARTICULO == articulos.articulo.ARTICULO);
  if( i >=0){
    if(this.articulos[i].articulo.PRECIO_UNITARIO  <= 0  ){

      this.articulos[i].articulo.PRECIO_UNITARIO  = 0
      this.articulos[i].articulo.PORC_DESCUENTO = 0;
      this.articulos[i].articulo.MONTO_DESCUENTO = 0;
      this.articulos[i].articulo.IMPUESTO1 = 0;
    
      this.articulos[i].totalDescuento = 0;
      this.articulos[i].montoSubTotal = 0;
      this.articulos[i].montoTotal = 0;
      this.articulos[i].totalImpuesto = 0;
    
      this.alertasService.message('DIONE', 'El precio debe de ser mayor a 0')
      return
    
    }
    if( this.articulos[i].articulo.CANTIDAD_ORDENADA <= 0){
      this.articulos[i].articulo.CANTIDAD_ORDENADA = 1;
      this.articulos[i].articulo.PORC_DESCUENTO = 0;
      this.articulos[i].articulo.MONTO_DESCUENTO = 0
      this.articulos[i].articulo.IMPUESTO1 = 0;
    
    
      this.articulos[i].totalDescuento = 0;
      this.articulos[i].montoSubTotal = 0;
      this.articulos[i].montoTotal = 0;
      this.articulos[i].totalImpuesto = 0;
    
      this.alertasService.message('DIONE', 'Las unidades deben de ser mayor a 0')
         
    }
    
    if( this.articulos[i].articulo.IMPUESTO1  < 0){
      this.articulos[i].articulo.IMPUESTO1  = 0
      this.articulos[i].totalImpuesto = 0;
      this.alertasService.message('DIONE', 'El impuesto debe de ser mayor a 0')
    }
    
    if( this.articulos[i].articulo.PORC_DESCUENTO  < 0){
      this.articulos[i].articulo.PORC_DESCUENTO  = 0
      this.articulos[i].articulo.MONTO_DESCUENTO = 0
      this.alertasService.message('DIONE', 'El descuento debe de ser mayor a 0')
    
    }else{
      this.articulos[i].articulo.MONTO_DESCUENTO =  this.articulos[i].articulo.PRECIO_UNITARIO *  this.articulos[i].articulo.CANTIDAD_ORDENADA;
      this.articulos[i].articulo.MONTO_DESCUENTO =    this.articulos[i].articulo.MONTO_DESCUENTO  * this.articulos[i].articulo.PORC_DESCUENTO / 100
    }
    
  
    this.articulos[i].montoSubTotal = Number( this.articulos[i].articulo.CANTIDAD_ORDENADA) * Number( this.articulos[i].articulo.PRECIO_UNITARIO);
  
    this.articulos[i].articulo.MONTO_DESCUENTO = this.articulos[i].articulo.PRECIO_UNITARIO *  this.articulos[i].articulo.CANTIDAD_ORDENADA;
    this.articulos[i].articulo.MONTO_DESCUENTO =  this.articulos[i].articulo.MONTO_DESCUENTO  *   this.articulos[i].articulo.PORC_DESCUENTO / 100
    this.articulos[i].totalDescuento = this.articulos[i].articulo.MONTO_DESCUENTO;
    this.articulos[i].totalImpuesto = this.articulos[i].articulo.PRECIO_UNITARIO *  this.articulos[i].articulo.CANTIDAD_ORDENADA;
    this.articulos[i].totalImpuesto =     this.articulos[i].totalImpuesto  *  this.articulos[i].articulo.IMPUESTO1 / 100
    this.articulos[i].montoTotal = Number( this.articulos[i].articulo.CANTIDAD_ORDENADA) * Number( this.articulos[i].articulo.PRECIO_UNITARIO) -   this.articulos[i].totalDescuento  +   this.articulos[i].totalImpuesto; 
  
    console.log(  this.articulos[i])

  }
 

}






  setDescuentoOrden($event){

  if(this.articulos.length  == 0){
    $event.target.value = 0;
    this.ordenCompra.MONTO_DESCUENTO = 0;
    this.alertasService.message('ISLEÑA', 'Debes de agregar al menos un producto.')
    return
  }
  let value = $event.target.value;
  console.log('this.ordenCompra.TOTAL_A_COMPRAR ', this.ordenCompra.TOTAL_A_COMPRAR )
  
  console.log('value', value )

    this.ordenCompra.PORC_DESCUENTO = value;


    console.log(' this.ordenCompra.MONTO_DESCUENTO', this.ordenCompra.MONTO_DESCUENTO)
   this.sumarTotales();
    
  }



/**
 *   borrarArticulo(index, articulo:PostArticulos){
  let i =  this.articulosService.articulos.findIndex(item => item.ARTICULO == articulo.articulo.ARTICULO);
  this.articulosService.articulos[i].SELECTED = false;
    this.articulosService.subTotal -= articulo.Total
    this.articulosService.total -= articulo.Total
    this.ordenCompra.TOTAL_A_COMPRAR   -= articulo.Total;
    this.articulosService.articulosPostArray.splice(index,1);
  }
 */
  rellenarOrdenCompra(proveedor:Proveedores){
    this.ordenCompra.FECHA = null;
    this.ordenCompra.ORDEN_COMPRA = null;
    this.ordenCompra.ORDEN_COMPRA = null;
    this.ordenCompra.USUARIO = this.usuariosService.usuario.UsuarioExactus;
    this.ordenCompra.PROVEEDOR = proveedor.ID;
    this.ordenCompra.BODEGA = null;
    this.ordenCompra.CONDICION_PAGO = proveedor.CONDICION_PAGO;
    this.ordenCompra.MONEDA = proveedor.MONEDA;
    this.ordenCompra.PAIS = proveedor.PAIS;
    this.ordenCompra.ESTADO = 'A';
    this.ordenCompra.FECHA = this.fecha;
    this.ordenCompra.FECHA_REQUERIDA = this.fecha;
    this.ordenCompra.PORC_DESCUENTO = 0;
    this.ordenCompra.MONTO_DESCUENTO = 0;
    this.ordenCompra.TOTAL_MERCADERIA = 0;
    this.ordenCompra.TOTAL_IMPUESTO1 = 0;
    this.ordenCompra.MONTO_FLETE = 0;
    this.ordenCompra.MONTO_SEGURO = 0;
    this.ordenCompra.MONTO_DOCUMENTACIO = 0;
    this.ordenCompra.MONTO_ANTICIPO = 0;
    this.ordenCompra.TOTAL_A_COMPRAR = 0;


    let i = this.monedas.findIndex(moneda => moneda.display ==  proveedor.MONEDA);

    if(i >=0){
      this.moneda = this.monedas[i].value;
    }

  }

  sumarTotales(){
  
    let totalUnidades = 0;
    let totalImpuesto1 = 0;
    let totalDescuento = 0;
    let subtotal = 0;
    let total = 0;
    this.TOTAL_UNIDADES = 0;
    this.ordenCompra.TOTAL_A_COMPRAR =0;
    this.ordenCompra.TOTAL_MERCADERIA  = 0;
    this.ordenCompra.TOTAL_IMPUESTO1 = 0;
    this.ordenCompra.MONTO_DESCUENTO = 0;


    for(let i = 0 ; i < this.articulos.length; i++){

      totalUnidades += this.articulos[i].articulo.CANTIDAD_ORDENADA;
      totalImpuesto1 += this.articulos[i].totalImpuesto;
      totalDescuento += this.articulos[i].totalDescuento;
      subtotal += this.articulos[i].montoSubTotal;
      total += this.articulos[i].montoTotal;
       totalImpuesto1 +=this.ordenCompra.TOTAL_IMPUESTO1;

     

      
      if(i == this.articulos.length -1){

        this.TOTAL_UNIDADES = totalUnidades;
        this.ordenCompra.TOTAL_MERCADERIA  = subtotal;
        this.ordenCompra.TOTAL_IMPUESTO1 = totalImpuesto1;
      

        this.ordenCompra.TOTAL_A_COMPRAR = subtotal + this.ordenCompra.TOTAL_IMPUESTO1  + this.ordenCompra.MONTO_FLETE + this.ordenCompra.MONTO_SEGURO +this.ordenCompra.MONTO_ANTICIPO ;

        this.ordenCompra.MONTO_DESCUENTO =   +((subtotal * this.ordenCompra.PORC_DESCUENTO ) / 100).toFixed(2)
        this.ordenCompra.TOTAL_A_COMPRAR =    this.ordenCompra.TOTAL_A_COMPRAR -  this.ordenCompra.MONTO_DESCUENTO
      }
    }


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
  
  
  // GENERA UN NUEVO CONSECUTIVO
  generarConsecutivo(consecutivoAnterior){

    console.log('consecutivoAnterior', consecutivoAnterior)
    let consecutivo: number = 0;
    let arreglo: string;
    let preArreglo: string;
    let tamDigitos: number = 6;
    
    arreglo = '';
    preArreglo = consecutivoAnterior.slice(0,2);
    consecutivo = +consecutivoAnterior.slice(2) + 1;
    for (let i = 0; i < tamDigitos - consecutivo.toString().length; i++) {
      arreglo = arreglo + '0';

      if(i == tamDigitos -1){
        
      }
    }
    return   preArreglo + arreglo + consecutivo.toString()
  }


  generarPost(){

  this.alertasService.presentaLoading('Generando Consecutivo')

    this.ordenCompraService.syncUltimaOrdenCompraToPromise().then(resp =>{
    this.ordenCompraService.ultimaOrdenCompra = resp[0];
console.log('ultima oc', resp)
    if(!this.actualizar && !this.ordenCompra.ORDEN_COMPRA){
      this.ordenCompra.ORDEN_COMPRA =  this.generarConsecutivo(this.ordenCompraService.ultimaOrdenCompra.ULT_ORDEN_COMPRA)
    
     }

      let putArticulos =[];
      let postArticulos = [];


      for(let i = 0; i < this.articulos.length; i++){
        this.articulos[i].articulo.ORDEN_COMPRA =  this.ordenCompra.ORDEN_COMPRA;


        if(  this.articulos[i].accion == 'I'){

          postArticulos.push(this.articulos[i].articulo);
        }else{

          putArticulos.push(this.articulos[i].articulo);
        }
    

        if(i === this.articulos.length -1){
      
          console.log('consecutivo',this.ordenCompra.ORDEN_COMPRA);
          console.log('orden de compra',this.ordenCompra);
          console.log('put',putArticulos);
          console.log('post',postArticulos);
          console.log('moneda',this.moneda);
          this.alertasService.loadingDissmiss();

//return
          if(this.actualizar){
       this.actualizarOrdeDeCompra(postArticulos,putArticulos);
          }else{

    this.generarOrdenDeCompra(postArticulos);

          }

     
        }
      }
    }, error =>{
      console.log('error',error);
      this.alertasService.loadingDissmiss();
    });

  }

  generarOrdenDeCompra(postArticulos){

    
  this.ordenCompraService.syncPostOrdenCompraToPromise([this.ordenCompra]).then(resp =>{
    console.log('orden de compra',[this.ordenCompra]);
 
    if(postArticulos.length > 0){

   for(let i = 0; i < postArticulos.length; i++){
    postArticulos[i].ORDEN_COMPRA_LINEA = i+1;

    if(i == postArticulos.length -1){
      this.alertasService.presentaLoading('Guardando Orden...')
      this.lineasService.syncPostLineasToPromise(postArticulos).then(resp =>{
        console.log('resp lineas', resp)
      this.alertasService.loadingDissmiss();
        this.alertasService.message('ISLEÑA', 'Orden Generada ' + this.ordenCompra.ORDEN_COMPRA)
        this.enviarCorreo();
       this.limpiarDatos();
      }, error =>{
        this.alertasService.loadingDissmiss();
        console.log(error)
        this.alertasService.message('ISLEÑA', 'Error guardando lineas .')
      });
    }
   }
    



    }

 



  }, error =>{
 
    console.log(error)
    this.alertasService.message('ISLEÑA', 'Error guardando orden entrega .')
  });

}
  actualizarOrdeDeCompra(postArticulos,putArticulos){
    this.ordenCompraService.syncPutOrdenCompraToPromise(this.ordenCompra).then(resp =>{
      console.log('orden de compra',[this.ordenCompra]);
      this.alertasService.message('ISLEÑA', 'Orden Actualizada ' + this.ordenCompra.ORDEN_COMPRA)
      if(postArticulos.length > 0){

let index = putArticulos.length >0 ? putArticulos.length : 0;
        for(let a = 0; a < postArticulos.length ; a++){
          index += 1;
          postArticulos[a].ORDEN_COMPRA_LINEA = putArticulos.length > 0 ? index : a+1 ;
          if(a == postArticulos.length -1){
            this.lineasService.syncPostLineasToPromise(postArticulos).then(resp =>{
              console.log('resp lineas', resp)
            this.limpiarDatos();
            }, error =>{
              console.log(error)
              this.alertasService.message('ISLEÑA', 'Error guardando lineas .')
            });

          }
        }

      }

      if(putArticulos.length > 0 ){

        putArticulos.forEach(articulo =>{
          this.lineasService.syncPutLineasToPromise(articulo).then(resp =>{
            console.log('resp linea put', resp)
            this.limpiarDatos();
          }, error =>{
            console.log(error)
            this.alertasService.message('ISLEÑA', 'Error guardando lineas put .')
          });
        });
      }
 
    }, error =>{
      this.alertasService.loadingDissmiss();
      console.log(error)
      this.alertasService.message('ISLEÑA', 'Error guardando orden entrega put .')
    });
  }

  estadoOrden(){

    let i = this.estados.findIndex(estado => estado.value == this.ordenCompra.ESTADO);
 if(i >=0){
  switch(this.estados[i].value){


    case 'A' : 
        this.color =  'secondary'
       
    break;
    case 'B' : 

    this.color =  'warning'

    break;
    case 'C' : 
    this.color =  'danger'

    break;
      case 'E' : 
      this.color =  'success'
    
    break;
      case  'D' :
      this.color=  'danger'

    break;
    case 'L' : 
    this.color =  'medium'

    break;
    case 'X' : 

    this.color =  'dark'

    break;
  
 

  }
   this.estado = '('+this.estados[i].value +')'+ this.estados[i].label;

return
 }


  }


  limpiarDatos(){
    this.ordenCompra = {
      ORDEN_COMPRA: null,
      USUARIO: this.usuariosService.usuario.UsuarioExactus,
      PROVEEDOR:  null,
      BODEGA:  null,
      CONDICION_PAGO: null,
      MONEDA: null,
      PAIS:  null,
      ESTADO:  'A',
      FECHA:  null,
      FECHA_COTIZACION:  null,
      FECHA_REQUERIDA: null,
      FECHA_EMBARQUE: null,
      FECHA_ARRIBO: null,
      FECHA_APROBACION: null,
      FECHA_DESALMACENAJE: null,
      FECHA_CIERRE: null,
      PORC_DESCUENTO:0,
      MONTO_DESCUENTO:0,
      TOTAL_MERCADERIA:0,
      TOTAL_IMPUESTO1: 0,
      MONTO_FLETE:0,
      MONTO_SEGURO:0,
      MONTO_DOCUMENTACIO:0,
      MONTO_ANTICIPO: 0,
      TOTAL_A_COMPRAR: 0,
      INSTRUCCIONES: null
    };

   this.estadoOrden();
  this.localizationService.syncPaisesContinentesToPromise().then(paises=>{
    this.localizationService.continents  = paises;
    this.articulos = [];
    this.actualizar = false;
    this.TOTAL_UNIDADES = 0;
    this.proveedor = null;
    this.bodega = null;
    this.moneda = '¢';
    this.actualizar = false;


  })
}
  enviarCorreo(){

    let emailPost:email = {
      toEmail:'gcompras@di.cr',
      file:null,
      subject:'Nueva Orden de Compra ' + this.ordenCompra.ORDEN_COMPRA,
      body:'Se genero la solicitud de la orden de compra ' + this.ordenCompra.ORDEN_COMPRA +' del proveedor '+ this.proveedor.NOMBRE+' por un total de ' + ColonesPipe.prototype.transform(this.ordenCompra.TOTAL_A_COMPRAR, 2 , '.' , ',' ,  this.moneda)
   
    }


    this.emailService.syncPostEmailToPromise(emailPost).then(resp =>{
      console.log('post email', resp)
   
    })
  }

}
