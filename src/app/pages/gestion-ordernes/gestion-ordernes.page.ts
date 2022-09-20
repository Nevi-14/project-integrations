import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetButton, ActionSheetController, MenuController, ModalController, PopoverController, AlertController } from '@ionic/angular';
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
import { LineasService } from 'src/app/services/lineas.service';
import { OrdenesDeCompraPage } from '../ordenes-de-compra/ordenes-de-compra.page';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { BodegasService } from 'src/app/services/bodegas.service';
import { ONEOCAprob } from 'src/app/models/ONEOCAprob';
interface PostArticulos {
  articulo:Lineas,
  Unidades:number,
  Cajas:number,
  Total: number,
  precioDescuento:number,
  montoImpuesto:number
}
@Component({
  selector: 'app-gestion-ordernes',
  templateUrl: './gestion-ordernes.page.html',
  styleUrls: ['./gestion-ordernes.page.scss'],
})
export class GestionOrdernesPage implements OnInit {
   estados = [
    {label:'Planeación',value:'A', checked:false},
    {label:'Por aprobar',value:'B', checked:false},
    {label:'No aprobada',value:'C', checked:false},
    {label:'Transito',value:'E', checked:false},
    {label:'Desalmacenaje',value:'D', checked:false},
    {label:'Liquidada',value:'L', checked:false},
    {label:'Cancelada',value:'X', checked:false},
  
  ]
  actualizar = false;
  ordenCompra:OrdenCompra =
  {
    ORDEN_COMPRA: null,
    USUARIO: null,
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
  TOTAL_UNIDADES =  0;
  proveedor:Proveedores;
  bodega:Bodegas;
  fecha: Date = new Date();
  date = this.fecha.getDate();
  month = this.fecha.getMonth();
  year = this.fecha.getFullYear();
  formatoFecha = new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';
  image = '../assets/islena.png';
  box = '../assets/supply-chain.svg';
  textoBuscar = '';
  articulos:Articulos[]=[];
  modeOn = false;
  estado = null;
  
    constructor(
      public modalCtrl: ModalController,
      public proveedoresService:ProveedoresService,
      public articulosService: ArticulosService,
      public route: Router,
      public ordenCompraService: OrdenCompraService,
      public alertasService: AlertasService,
      public popOverCtrl: PopoverController,
      public lineasService: LineasService,
      public usuariosService:UsuariosService,
      public menu: MenuController,
      public bodegasService: BodegasService,
      public alertCTrl: AlertController
    ) { }
  
    ngOnInit() {
     
  
    }
    openCustom() {
      this.menu.enable(true, 'custom');
      this.menu.open('custom');
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
        this.limpiarDatos();
        this.proveedor = data.proveedor;
        this.articulosService.articulosProveedor = [];
        this.rellenarOrdenCompra(data.proveedor);
        this.articulosService.syncGetArticulos(this.proveedor.ID)
      }
    }
  



    async approvers() {

      let inputs = [];
      let approvers:ONEOCAprob[] = [];
      for(let i = 0;  i < this.usuariosService.approvers.length; i++){
        let a =  this.usuariosService.ocAppData.findIndex(aprob => aprob.Usuario == this.usuariosService.approvers[i].Usuario  &&  aprob.ORDEN_COMPRA == this.ordenCompra.ORDEN_COMPRA );
        if(a < 0 ){
          inputs.push( {
            label: this.usuariosService.approvers[i].Posicion ,
            type: 'checkbox',
            value: this.usuariosService.approvers[i].Usuario,
            checked:false
          })

        }

  
  
      }
        const alert = await this.alertCTrl.create({
          header: 'Aprobador OC',
          subHeader:'Orden de compra ' +this.ordenCompra.ORDEN_COMPRA,
          cssClass:'custom-alert',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
          
              },
            },
            {
              text: 'Continuar',
              role: 'confirm',
              handler: (data) => {
                this.ordenCompra.ESTADO = this.estado

            
                data.forEach(user => {
                  approvers.push({
    ORDEN_COMPRA: this.ordenCompra.ORDEN_COMPRA,
     Usuario: user,
     Estatus: this.ordenCompra.ESTADO,
     Fecha: new Date().toISOString()
                  })
                });
                this.ordenCompraService.syncPutOrdenCompraToPromise(this.ordenCompra).then(resp =>{
                  console.log('orden de compra',[this.ordenCompra]);
                  this.alertasService.message('DIONE', 'El estado se actualizo con exito')
                  this.usuariosService.syncPostONEOCAprobToPromise(approvers).then(resp =>{
                    console.log(resp, 'test')
          
               
                    });
                  this.limpiarDatos();
                }, error =>{
                  console.log(error)
                  this.alertasService.message('DIONE', 'Error Actualizando el estado de la orden')
                });
             console.log('approvers',approvers)
           

       
              },
            },
          ],
          inputs:inputs,
        });
    
        await alert.present();
      }

 
async actualizarEstado() {

  let inputs = [];
for(let i = 0;  i < this.estados.length; i++){

  if(this.ordenCompra.ESTADO == this.estados[i].value ){
    this.estados[i].checked = true
  }

  switch(this.ordenCompra.ESTADO){
    case 'A':
      if(this.estados[i].value  == 'B'  || this.estados[i].value  == 'X' ){
        inputs.push( {
          label: '(' +this.estados[i].value + ') '+this.estados[i].label ,
          type: 'radio',
          value: this.estados[i].value,
          checked:this.estados[i].checked
        })
       }

      break;
    case 'B':
      if(this.estados[i].value  == 'C'  || this.estados[i].value  == 'E' ){
        inputs.push( {
          label: '(' +this.estados[i].value + ') '+this.estados[i].label ,
          type: 'radio',
          value: this.estados[i].value,
          checked:this.estados[i].checked
        })
       }
      break;

      case 'E':
        if(this.estados[i].value  == 'D' ){
          inputs.push( {
            label: '(' +this.estados[i].value + ') '+this.estados[i].label ,
            type: 'radio',
            value: this.estados[i].value,
            checked:this.estados[i].checked
          })
         }
        break;

        case 'D':
          if(this.estados[i].value  == 'L' ){
            inputs.push( {
              label: '(' +this.estados[i].value + ') '+this.estados[i].label ,
              type: 'radio',
              value: this.estados[i].value,
              checked:this.estados[i].checked
            })
           }
        break;
    default:
      
  };



}
    const alert = await this.alertCTrl.create({
      header: 'Actualizar Estado',
      subHeader:'Orden de compra ' +this.ordenCompra.ORDEN_COMPRA,
      buttons: [
        {
          text: 'Cancelelar',
          role: 'cancel',
          handler: () => {
      
          },
        },
        {
          text: 'Continuar',
          role: 'confirm',
          handler: (data) => {
         console.log('data',data)
         this.estado = data;

         if(this.ordenCompra.ESTADO == 'A' && data == 'B'){
          this.approvers();

          return
         }else{
          this.ordenCompra.ESTADO = this.estado;
          this.ordenCompraService.syncPutOrdenCompraToPromise(this.ordenCompra).then(resp =>{
            console.log('orden de compra',[this.ordenCompra]);
            this.alertasService.message('DIONE', 'El estado se actualizo con exito')
         
            this.limpiarDatos();
          }, error =>{
            console.log(error)
            this.alertasService.message('DIONE', 'Error Actualizando el estado de la orden')
          });
         }

         
        
   
          },
        },
      ],
      inputs:inputs,
    });

    await alert.present();
  }

  estadoOrden(){

    let i = this.estados.findIndex(estado => estado.value == this.ordenCompra.ESTADO);

    return '('+this.estados[i].value +')'+ this.estados[i].label


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
       async consultarOrdenesEstado() {
  
        if(localStorage.getItem('proveedores')){
          this.proveedoresService.proveedores = JSON.parse(localStorage.getItem('proveedores'));
        }
        this.proveedoresService.syncGetProvedorestoPromise('').then(resp =>{
          this.proveedoresService.proveedores = resp.slice(0);
        })
      
        let inputs = [];

      for(let i = 0;  i < this.estados.length; i++){
  
        inputs.push( {
          label: '(' +this.estados[i].value + ') '+this.estados[i].label ,
          type: 'radio',
          value: this.estados[i].value,
          checked:false
        })
      }
          const alert = await this.alertCTrl.create({
            header: 'Consultar OC - Estado',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
              
                },
              },
              {
                text: 'Continuar',
                role: 'confirm',
                handler: (data) => {
                  this.estado = data;
                  this.ordenesDeCompra(data)
               console.log('data',data)
                },
              },
            ],
            inputs:inputs,
          });
      
          await alert.present();
        }

       async  ordenesDeCompra(estado){
       
        let modal = await  this.modalCtrl.create({
       component:OrdenesDeCompraPage,
       cssClass: 'large-modal',
       componentProps:{
        estado:estado
       }
       
           });
           await modal.present();
           const { data } = await modal.onWillDismiss();
       if(data != undefined){
        this.ordenCompra = data.orden;
        this.ordenCompra.ESTADO = estado;
        if(this.ordenCompra.FECHA){
          let fecha_orden = this.ordenCompra.FECHA;
this.fecha = new Date(this.ordenCompra.FECHA);
this.date =  new Date(fecha_orden).getDate();
this.month =  new Date(fecha_orden).getMonth();
this.year =  new Date(fecha_orden).getFullYear();
        }
        this.actualizar = true;
   this.sincronizarOrdenDeEntregaExistente();
        
       }
           
         }
  
  
         sincronizarOrdenDeEntregaExistente(){
          this.ordenCompra.FECHA = null;
          this.ordenCompra.USUARIO = this.usuariosService.usuario.UsuarioExactus;
          this.proveedoresService.proveedores = []
          this.proveedoresService.syncGetProvedorestoPromise(this.ordenCompra.PROVEEDOR).then(resp =>{
            this.proveedoresService.proveedores = resp;
    
            let p =    this.proveedoresService.proveedores.findIndex(proveedor => proveedor.ID == this.ordenCompra.PROVEEDOR);
            this.proveedor = this.proveedoresService.proveedores[p];
            console.log('res', resp)
            this.bodegasService.bodegas = [];
            this.bodegasService.syncGetBodegasToPromise().then(bodegas =>{
           this.bodegasService.bodegas = bodegas;
              let b =  this.bodegasService.bodegas.findIndex(bodega => bodega.BODEGA == this.ordenCompra.BODEGA);
              this.bodega = this.bodegasService.bodegas[b];
              this.articulosService.articulosPostArray = [];
              this.articulosService.articulos = [];
              this.articulos =[];
              this.articulosService.syncGetArticulosToPromise(this.ordenCompra.PROVEEDOR).then(articulos =>{
      this.articulosService.articulos = articulos;
                this.articulos = articulos;
                console.log('this.articulos', this.articulos)
                this.lineasService.syncConsultarLineasOrdenCompra(this.ordenCompra.ORDEN_COMPRA).then(lineas =>{
                  console.log('lineas', lineas)
                  this.rellenarLineas(lineas);
                              });
              })
  
  
            })
    
          });
  
  
         }
  
  
         rellenarLineas(lineas:Lineas[]){
          lineas.forEach(linea => {
  
            console.log(linea)
  
            this.articulosService.agregarArticulo(linea);
            this.sumarTotales();
  
          })
  
         }
    async  listaArticulos(){
  
      if(!this.bodega){
      this.alertasService.message('ISLEÑA','Seleccionar Bodega')
        return
      }
      let modal = await  this.modalCtrl.create({
        component:ListaArticulosPage,
        cssClass: 'items-modal',
     
      });
  
      await modal.present();
      const { data } = await modal.onWillDismiss();
      this.ordenCompra.TOTAL_A_COMPRAR  =  this.articulosService.total
  
      this.sumarTotales();
    }
    
    limpiarDatos(){
      this.usuariosService.syncGetONEUserAprob();
      this.usuariosService.syncGetONEOCAprob();
      this.articulosService.total = 0;
      this.articulosService.subTotal = 0;
      this.proveedor = null;
      this.proveedoresService.proveedores = [];
      this.articulosService.articulos = [];
      this.articulosService.articulosProveedor = [];
      this.articulosService.articulosPostArray = [];
      this.TOTAL_UNIDADES = 0;
      this.bodega = null;
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
      }
      this.fecha = new Date();
      this.actualizar = false;
      this.date = new Date().getDate();
      this.month = new Date().getMonth();
      this.year = new Date().getFullYear();
      
    }
    

  
  async fechaOrdenCompra(ordenCompra:OrdenCompra, property:string) {

  if(this.ordenCompra.ESTADO != 'A' && this.actualizar){
    return
  }
    console.log('ordenCompra[property]', ordenCompra[property], property)
    const popover = await this.popOverCtrl.create({
      component: CalendarioPopoverPage,
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps : {
        fecha:ordenCompra[property] == null ?  this.formatoFecha : ordenCompra[property]
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
      this.ordenCompra[property] = data.fecha;
  
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
   
    // actualizamos monto descuento 
    articulo.articulo.MONTO_DESCUENTO = articulo.articulo.PORC_DESCUENTO ?  articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO : 0;
      // actualizamos precio descuento 
      // actualizamos precio descuento 
      articulo.precioDescuento  = articulo.articulo.MONTO_DESCUENTO > 0 ?   (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO : 0;
    // actualizamos total
    let montoImpuesto = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.IMPUESTO1;
    articulo.montoImpuesto = montoImpuesto;
    articulo.Total =  (articulo.articulo.CANTIDAD_ORDENADA *   articulo.articulo.PRECIO_UNITARIO) - (articulo.articulo.MONTO_DESCUENTO * articulo.articulo.CANTIDAD_ORDENADA) + montoImpuesto ;
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
      
      this.TOTAL_UNIDADES  = 0;
      this.articulosService.subTotal = 0;
      this.articulosService.total = 0;
      this.ordenCompra.TOTAL_MERCADERIA = 0;
      this.ordenCompra.TOTAL_IMPUESTO1 = 0;
      this.ordenCompra.TOTAL_A_COMPRAR = 0;
      this.articulosService.total +=this.ordenCompra.MONTO_FLETE;
      this.articulosService.total += this.ordenCompra.MONTO_SEGURO;
      this.ordenCompra.TOTAL_A_COMPRAR  =  this.articulosService.total
      for(let i =0; i< this.articulosService.articulosPostArray.length; i++){
        this.TOTAL_UNIDADES   +=Number( this.articulosService.articulosPostArray[i].articulo.CANTIDAD_ORDENADA)
  
        this.articulosService.articulosPostArray[i].articulo.BODEGA = this.ordenCompra.BODEGA
        this.articulosService.articulosPostArray[i].articulo.ORDEN_COMPRA = this.ordenCompra.ORDEN_COMPRA;
        this.articulosService.subTotal += this.articulosService.articulosPostArray[i].Total
        this.articulosService.total += this.articulosService.articulosPostArray[i].Total
        this.ordenCompra.TOTAL_MERCADERIA +=Number( this.articulosService.articulosPostArray[i].articulo.CANTIDAD_ORDENADA) * (this.articulosService.articulosPostArray[i].articulo.PRECIO_UNITARIO )
        this.ordenCompra.TOTAL_IMPUESTO1 += Number(this.articulosService.articulosPostArray[i].Unidades) * (this.articulosService.articulosPostArray[i].articulo.PRECIO_UNITARIO / 100) *this.articulosService.articulosPostArray[i].articulo.IMPUESTO1;
        if(i == this.articulosService.articulosPostArray.length -1){
  
        this.ordenCompra.TOTAL_A_COMPRAR  =   this.ordenCompra.TOTAL_MERCADERIA + this.ordenCompra.MONTO_FLETE + this.ordenCompra.MONTO_SEGURO
        
        }
      }
    }
  
    onInputChange(event: string) {
      return Number.parseFloat(event).toFixed(2);
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
    articulo.articulo.MONTO_DESCUENTO = articulo.articulo.PORC_DESCUENTO ?  articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO : 0;
      // actualizamos precio descuento 
      // actualizamos precio descuento 
      articulo.precioDescuento  = articulo.articulo.MONTO_DESCUENTO > 0 ?   (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO : 0;
      // actualizamos total
      let montoImpuesto = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.IMPUESTO1;
      articulo.montoImpuesto = montoImpuesto;
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
    // actualizamos monto descuento 
    articulo.articulo.MONTO_DESCUENTO = articulo.articulo.PORC_DESCUENTO ?  articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO : 0;
      // actualizamos precio descuento 
         // actualizamos precio descuento 
         articulo.precioDescuento  = articulo.articulo.MONTO_DESCUENTO > 0 ?   (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO : 0;
      // actualizamos total
      let montoImpuesto = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.IMPUESTO1;
      articulo.montoImpuesto = montoImpuesto;
      articulo.Total =  (articulo.articulo.CANTIDAD_ORDENADA *   articulo.articulo.PRECIO_UNITARIO) - (articulo.articulo.MONTO_DESCUENTO * articulo.articulo.CANTIDAD_ORDENADA) + montoImpuesto ;
      this.sumarTotales();
      
    }
  
    setDescuentoOrden($event){
  
    if(this.articulosService.articulosPostArray.length  == 0){
      $event.target.value = 0;
      this.ordenCompra.MONTO_DESCUENTO = 0;
      this.alertasService.message('ISLEÑA', 'Debes de agregar al menos un producto.')
      return
    }
      let value = $event.target.value;
      this.ordenCompra.PORC_DESCUENTO = value;
    this.ordenCompra.MONTO_DESCUENTO = (this.ordenCompra.TOTAL_A_COMPRAR / 100) *value
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
    articulo.articulo.MONTO_DESCUENTO = articulo.articulo.PORC_DESCUENTO ?  articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO : 0;
      // actualizamos precio descuento 
      articulo.precioDescuento  = articulo.articulo.MONTO_DESCUENTO > 0 ?   (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.PORC_DESCUENTO : 0;
      // actualizamos total
      let montoImpuesto = articulo.Unidades * (articulo.articulo.PRECIO_UNITARIO / 100) *articulo.articulo.IMPUESTO1;
      articulo.montoImpuesto = montoImpuesto;
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
      this.ordenCompra.FECHA = this.formatoFecha;
      this.ordenCompra.FECHA_REQUERIDA = this.formatoFecha;
      this.ordenCompra.PORC_DESCUENTO = 0;
      this.ordenCompra.MONTO_DESCUENTO = 0;
      this.ordenCompra.TOTAL_MERCADERIA = 0;
      this.ordenCompra.TOTAL_IMPUESTO1 = 0;
      this.ordenCompra.MONTO_FLETE = 0;
      this.ordenCompra.MONTO_SEGURO = 0;
      this.ordenCompra.MONTO_DOCUMENTACIO = 0;
      this.ordenCompra.MONTO_ANTICIPO = 0;
      this.ordenCompra.TOTAL_A_COMPRAR = 0;
  
    }
  
    generarPost(){
  
      if(!this.proveedor || !this.bodega || !this.ordenCompra || this.articulosService.articulosPostArray.length == 0    || this.ordenCompra.USUARIO == null){
        this.alertasService.message('ISLEÑA','La orden de compra no se encuentra completa aun.')
        return
      }

      this.alertasService.presentaLoading('Generando Consecutivo')
  
      this.ordenCompraService.syncUltimaOrdenCompraToPromise().then(resp =>{
      this.ordenCompraService.ultimaOrdenCompra = resp[0];
      let ORDEN_COMPRA =  this.ordenCompra.ORDEN_COMPRA;
      if(!this.actualizar && this.ordenCompra.ORDEN_COMPRA == null){
        ORDEN_COMPRA =  this.nextConsecutivo(this.ordenCompraService.ultimaOrdenCompra.ULT_ORDEN_COMPRA)
        console.log('ORDEN_COMPRA',ORDEN_COMPRA)

        this.ordenCompra.ORDEN_COMPRA = ORDEN_COMPRA;
       }
   
        let putArticulos =[];
        let postArticulos = [];
        for(let i = 0; i < this.articulosService.articulosPostArray.length; i++){
          this.articulosService.articulosPostArray[i].articulo.ORDEN_COMPRA =  !this.actualizar ? this.ordenCompra.ORDEN_COMPRA : ORDEN_COMPRA;


          if(  this.articulosService.articulosPostArray[i].accion == 'I'){

            postArticulos.push(this.articulosService.articulosPostArray[i].articulo);
          }else{

            putArticulos.push(this.articulosService.articulosPostArray[i].articulo);
          }
      

          if(i === this.articulosService.articulosPostArray.length -1){
        
            console.log('consecutivo',this.ordenCompraService.ultimaOrdenCompra.ULT_ORDEN_COMPRA);
            console.log('orden de compra',this.ordenCompra);
            console.log('put',putArticulos);
            console.log('post',postArticulos);
            this.alertasService.loadingDissmiss();

//return;
            if(this.actualizar){
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
              console.log(error)
              this.alertasService.message('ISLEÑA', 'Error guardando orden entrega put .')
            });
            }else{

        
              this.ordenCompraService.syncPostOrdenCompraToPromise([this.ordenCompra]).then(resp =>{
                console.log('orden de compra',[this.ordenCompra]);
                this.alertasService.message('ISLEÑA', 'Orden Generada ' + this.ordenCompra.ORDEN_COMPRA)

                if(postArticulos.length > 0){

               for(let i = 0; i < postArticulos.length; i++){
                postArticulos[i].ORDEN_COMPRA_LINEA = i+1;

                if(i == postArticulos.length -1){
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
                console.log(error)
                this.alertasService.message('ISLEÑA', 'Error guardando orden entrega .')
              });


            }

  
         return
  
       
          }
        }
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
