import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PaisesContientesSoftland } from 'src/app/models/paisescontientes';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { Ordenes } from '../../models/ordenes';
import { OrdenCompra } from '../../models/ordencompra copy';
import { AlertasService } from '../../services/alertas.service';
import { OrdenComprasInternacionales } from 'src/app/models/ordenesComprasInternacionales';
import { OrdenDeCompraDetallePage } from '../orden-de-compra-detalle/orden-de-compra-detalle.page';
import { LineasService } from 'src/app/services/lineas.service';
import { CalendarioPopoverPage } from '../calendario-popover/calendario-popover.page';
import { ListaPaisesPage } from '../lista-paises/lista-paises.page';

@Component({
  selector: 'app-ordenes-internacionales',
  templateUrl: './ordenes-internacionales.page.html',
  styleUrls: ['./ordenes-internacionales.page.scss'],
})
export class OrdenesInternacionalesPage implements OnInit {
@Input() estado:string;
paises: PaisesContientesSoftland[];
ordenesArray:OrdenComprasInternacionales[];
ordenes:OrdenComprasInternacionales[];
textoBuscar = '';
modalOpen = false;
pais = null;
fechaP = new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';
fechaE = new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';
fechaPModificada = false;
fechaEModificada = false;
  constructor(
public modalCtrl:ModalController,
public localizacionService: LocalizacionService,
public alertasService: AlertasService,
public lineasService: LineasService,
public popOverCtrl: PopoverController

  ) { }

  ngOnInit() {
    this.ordenesArray = this.ordenes;
    this.alertasService.loadingDissmiss();
    console.log('ordenes',this.ordenes)
    this.localizacionService.syncPaisesContinentesToPromise().then(paises=>{
      this.paises = paises;
      console.log('paises', paises)
      });
  }
  rellenarArregloMapa(array:OrdenCompra){


  }
  async fechaPedido( ) {
    const popover = await this.popOverCtrl.create({
      component: CalendarioPopoverPage,
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps : {
        fecha:this.fechaP
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
      this.fechaP = data.fecha;
      this.fechaPModificada = true; 
    }
  }

  async fechaLlegada( ) {
    const popover = await this.popOverCtrl.create({
      component: CalendarioPopoverPage,
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps : {
        fecha:this.fechaE
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
      this.fechaE = data.fecha;
      this.fechaEModificada = true; 
    }
  }

reset(){

   this.fechaP  =  new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';
  this.fechaE =  new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';
  this.pais = null;
  this.ordenes = this.ordenesArray;
  this.fechaEModificada = false; 
  this.fechaPModificada = false; 
}
  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
  cerrarModal(){

this.modalCtrl.dismiss();
  }


  filtrarDatos(){
this.ordenes = this.ordenesArray;
let fechaP = new Date(this.fechaP).toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';
let fechaE = new Date(this.fechaE).toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';

if(this.pais){

  if(this.fechaPModificada || this.fechaEModificada){

    this.ordenes =  this.ordenes.filter(orden => orden.PAIS == this.pais.PAIS  && orden.FECHA >= fechaP && orden.FECHA_REQUERIDA <= fechaE);

  }else{
    this.ordenes =  this.ordenes.filter(orden => orden.PAIS == this.pais.PAIS);

  }
 
}else{
  this.ordenes =  this.ordenes.filter(orden =>  orden.FECHA >= fechaP && orden.FECHA_REQUERIDA <= fechaE);
}
    
  }

  consultarOrden(ordenCompra){

    this.alertasService.presentaLoading('Cargando datos..')

    this.lineasService.syncConsultarLineasOrdenCompra(ordenCompra.ORDEN_COMPRA).then(lineas =>{
      console.log('lineas', lineas)
      this.detalleOrden(ordenCompra,lineas);
      this.alertasService.loadingDissmiss();
  
                  })
  }

  async listaPaises( ){

    if (!this.modalOpen){
                    
      const modal = await this.modalCtrl.create({
        component:ListaPaisesPage,
        cssClass:'large-modal',
        mode:'md',
        
      });
      this.modalOpen = true;
      
    
       await modal.present();
       const { data } = await modal.onWillDismiss();
       this.modalOpen = false;
      
       if(data.pais != undefined){
        console.log(data.pais)
  this.pais = data.pais;

       }
    
    }
    



}


  async detalleOrden(ordenCompra, lineas){

                  if (!this.modalOpen){

          
                                  
                    const modal = await this.modalCtrl.create({
                      component:OrdenDeCompraDetallePage,
                      cssClass:'large-modal',
                      mode:'md',
                      componentProps:{
                        //estado:estado,
                        ordenCompra:ordenCompra,
                        lineas:lineas
                      }
                    });
                    this.modalOpen = true;
                    
                  
                     await modal.present();
                     const { data } = await modal.onWillDismiss();
                     this.modalOpen = false;
                    
                  
                  }
                  

    
    
      }
}
