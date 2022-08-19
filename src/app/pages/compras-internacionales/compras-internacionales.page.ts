import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';
import * as  mapboxgl from 'mapbox-gl';
import { ModalController } from '@ionic/angular';

import { LocalizacionService } from 'src/app/services/localizacion.service';
import { Continentes } from 'src/app/models/continentes';
import { OrdenesInternacionalesPage } from '../ordenes-internacionales/ordenes-internacionales.page';

import { OrdenCompraService } from '../../services/ordencompra.service';
import { OrdenComprasInternacionales } from 'src/app/models/ordenesComprasInternacionales';
import { PaisesContientesSoftland } from 'src/app/models/paisescontientes';

@Component({
  selector: 'app-compras-internacionales',
  templateUrl: './compras-internacionales.page.html',
  styleUrls: ['./compras-internacionales.page.scss'],
 
})
export class ComprasInternacionalesPage implements OnInit, AfterViewInit {
  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!: mapboxgl.Map;
  lngLat: [number, number] = [ -84.14123589305028, 9.982628288210657 ];
  zoomLevel: number = 0;
  continentes:Continentes[];
  paises:PaisesContientesSoftland[];
  ordenes:OrdenComprasInternacionales[];
  incluirOP = true;
  incluirOT = true;
  fullscreen = false;
  estados = [
    {id:1,code:'A',estado:'Planificaicón'},
    {id:2,code:'E',estado:'Transito'}
  
  ];
  imagenes = [

'assets/numbers/028-1.svg',
'assets/numbers/029-2.svg',
'assets/numbers/030-3.svg',
'assets/numbers/031-4.svg',
'assets/numbers/032-5.svg',
'assets/numbers/033-6.svg'

  ];
  ordenesEnPlanificacion:OrdenComprasInternacionales[]=[];
  ordenesEnTransito:OrdenComprasInternacionales[]=[];
  
  private modalOpen:boolean = false;
  constructor(
public alertasService:AlertasService,
public modalCtrl: ModalController,
public localizacionService:LocalizacionService,
public ordenesService: OrdenCompraService

  ) { }

  filtrarEstado(estado){
    this.alertasService.presentaLoading('Adjuntado informacion al mapa');

      if(estado == 'A'){
        this.incluirOP = true;
        this.incluirOT = false;
        this.filtrarPlanificacion();
      }else if ( estado == 'E'){
        this.incluirOP = false;
        this.incluirOT = true;
 this.filtrarTransito()

      }else{
        this.incluirOP = true;
        this.incluirOT = true;
        this.filtrarTodos();
      }

      this.ordenesService.syncGetOrdenesCompraEstadoToPromise('A').then((planificacion:any)=>{


      })
  }


  ngOnInit() {





    


  }

  filtrarTransito(){
    
    this.ordenesService.syncGetOrdenesCompraEstadoToPromise('E').then((planificacion:any)=>{
      this.ordenesEnTransito = planificacion;
      this.ordenesEnTransito.forEach((orden, counter) =>{
        let index = this.paises.findIndex( pais=> pais.PAIS == orden.PAIS)
        orden.LONGITUD = this.paises[index].LONGITUD;
        orden.LATITUD =  this.paises[index].LATITUD;
        this.paises[index].TOTAL += 1;
        this.paises[index].TRANSITO += 1;
        if( counter == this.ordenesEnPlanificacion.length -1 ){
      
this.crearMapa();
       
  }

})
    })
  }
  filtrarPlanificacion(){
 
    this.ordenesService.syncGetOrdenesCompraEstadoToPromise('A').then((planificacion:any)=>{
      this.ordenesEnPlanificacion = planificacion;
      this.ordenesEnPlanificacion.forEach((orden, counter) =>{
        let index = this.paises.findIndex( pais=> pais.PAIS == orden.PAIS)
        this.paises[index].TOTAL += 1;
        this.paises[index].PLANIFICACION += 1;
        orden.LONGITUD = this.paises[index].LONGITUD;
        orden.LATITUD =  this.paises[index].LATITUD;
        if( counter == this.ordenesEnPlanificacion.length -1 ){
      
this.crearMapa();
       
  }

})
    })
  }


  filtrarTodos(){

    this.ordenesService.syncGetOrdenesCompraEstadoToPromise('A').then((planificacion:any)=>{
      this.ordenesEnPlanificacion = planificacion;
      this.ordenesEnPlanificacion.forEach((orden, counter) =>{
        let index = this.paises.findIndex( pais=> pais.PAIS == orden.PAIS)
        this.paises[index].TOTAL += 1;
        this.paises[index].PLANIFICACION += 1;
        orden.LONGITUD = this.paises[index].LONGITUD;
        orden.LATITUD =  this.paises[index].LATITUD;
        if( counter == this.ordenesEnPlanificacion.length -1 ){
      
          console.log('ordenes en planificacion', planificacion)
          this.ordenesService.syncGetOrdenesCompraEstadoToPromise('E').then((transito:any)=>{
            this.ordenesEnTransito = transito;
       
            this.ordenesEnTransito.forEach((orden,counter2) =>{
              let index = this.paises.findIndex( pais=> pais.PAIS == orden.PAIS)
               this.paises[index].TOTAL += 1;
               this.paises[index].TRANSITO += 1;
              orden.LONGITUD = this.paises[index].LONGITUD;
              orden.LATITUD =  this.paises[index].LATITUD;
              if( counter2 == this.ordenesEnTransito.length -1 ){
  
       console.log('ordenes en transito', transito)
       this.crearMapa();
              }
  
            })
                });
        }
      
      });
      
      
      
      
          });
  }
  ngAfterViewInit() {
    this.alertasService.presentaLoading('Adjuntado informacion al mapa');
    this.ordenes = [];
    this.continentes = [];

    this.localizacionService.syncContinentesToPromise().then(continentes =>{
      this.continentes = continentes;
  console.log('continentes', continentes)
  
  this.localizacionService.syncPaisesContinentesToPromise().then(paises=>{
  this.paises = paises;
  console.log('paises', paises)

this.filtrarTodos();
this.crearMapa();
  });

    });


 
   
  }
  crearMapa(){
    
    if(this.mapa){
      this.mapa.remove();
    }

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
      center: this.lngLat,
      zoom: this.zoomLevel,
      interactive: true,
      
    });


    
    // Create a default Marker and add it to the map.

    const newMarker = new mapboxgl.Marker({
      color:"#000000",
      draggable: false
    })

   

    newMarker.setLngLat(this.lngLat)
    .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setText("DISTRIBUIDORA ISLEÑA"))
    .addTo(this.mapa)
  //  .togglePopup();
  this.mapa.addControl(new mapboxgl.NavigationControl());
  this.mapa.addControl(new mapboxgl.FullscreenControl());

  for(let p = 0; p < this.paises.length; p++){

  
if(this.paises[p].TOTAL > 0){
  const marker2 = new mapboxgl.Marker({
    color:"#000000",
    draggable: true
  })
//alert([orden.LONGITUD, orden.LATITUD])
marker2.setLngLat([this.paises[p].LONGITUD, this.paises[p].LATITUD])
.setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setText(

  'Pais ' +this.paises[p].PAIS+ ' Total Ordenes '+String(this.paises[p].TOTAL) + ' - Planificacion ' + this.paises[p].PLANIFICACION + ' - Transito ' + this.paises[p].TRANSITO


))
.addTo(this.mapa)

}

if(p == this.paises.length -1){

  

  this.mapa.on('load', () => {
    this.alertasService.loadingDissmiss();
    this.mapa.resize();
  });


}
  }






  }

  agregarTodaslasOrdenesPMapa(){
    for(let OP = 0; OP < this.ordenesEnPlanificacion.length; OP++){

  
      const marker2 = new mapboxgl.Marker({
        color:"#000000",
        draggable: true
      })
    //alert([orden.LONGITUD, orden.LATITUD])
    marker2.setLngLat([this.ordenesEnPlanificacion[OP].LONGITUD, this.ordenesEnPlanificacion[OP].LATITUD])
    .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setText(this.ordenesEnPlanificacion[OP].PAIS))
    .addTo(this.mapa)
    
    if(OP == this.ordenesEnPlanificacion.length -1){
    
      
    
      this.mapa.on('load', () => {
        this.alertasService.loadingDissmiss();
        this.mapa.resize();
      });
    
    
    }
    }
    
    
    
    
  }


  agregarTodaslasOrdenesTMapa(){

    for(let OT = 0; OT < this.ordenesEnTransito.length; OT++){
      const marker2 = new mapboxgl.Marker({
        color:"#000000",
        draggable: true
      })
    //alert([orden.LONGITUD, orden.LATITUD])
    marker2.setLngLat([this.ordenesEnTransito[OT].LONGITUD, this.ordenesEnTransito[OT].LATITUD])
    .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setText(this.ordenesEnTransito[OT].NOMBRE))
    .addTo(this.mapa)
  
  
    if(OT == this.ordenesEnTransito.length -1){
  
      
  
  
  
   this.mapa.on('load', () => {
       this.alertasService.loadingDissmiss();
    this.mapa.resize();
  });
    }
  
    }
    
    
    
  }

  agregarTodaslasOrdenesMapa(){
    for(let OP = 0; OP < this.ordenesEnPlanificacion.length; OP++){

  
      const marker2 = new mapboxgl.Marker({
        color:"#000000",
        draggable: true
      })
    //alert([orden.LONGITUD, orden.LATITUD])
    marker2.setLngLat([this.ordenesEnPlanificacion[OP].LONGITUD, this.ordenesEnPlanificacion[OP].LATITUD])
    .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setText(this.ordenesEnPlanificacion[OP].PAIS))
    .addTo(this.mapa)
    
    if(OP == this.ordenesEnPlanificacion.length -1){
    
      for(let OT = 0; OT < this.ordenesEnTransito.length; OT++){
        const marker2 = new mapboxgl.Marker({
          color:"#000000",
          draggable: true
        })
      //alert([orden.LONGITUD, orden.LATITUD])
      marker2.setLngLat([this.ordenesEnTransito[OT].LONGITUD, this.ordenesEnTransito[OT].LATITUD])
      .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setText(this.ordenesEnTransito[OT].PAIS))
      .addTo(this.mapa)
    
    
      if(OT == this.ordenesEnTransito.length -1){
    
        
    
    
    
     this.mapa.on('load', () => {
      this.alertasService.loadingDissmiss();
      this.mapa.resize();
    });
      }
    
      }
    
    
    }
    }
    
    
    
    
  }


  showFullscreen(){
   let container =  this.mapa.getContainer();
   container.requestFullscreen();
  }



  async ordenesInternacionales(ordenes){
  
     

if (!this.modalOpen){
  this.alertasService.presentaLoading('preparando ordenes, un momento...');
  const modal = await this.modalCtrl.create({
    component:OrdenesInternacionalesPage,
    cssClass:'fullscreen-large-modal',
    mode:'md',
    componentProps:{
      //estado:estado,
      ordenes:ordenes
    }
  });
  this.modalOpen = true;

   await modal.present();
   const { data } = await modal.onWillDismiss();
   this.modalOpen = false;
  

}



  }
  filtrar($event){

    let data:Continentes = $event.detail.value;

    console.log(data, 'data')
    if(data.longitud && data.latitud){
      let longLat = [data.longitud,data.latitud];
       this.irMarcador(longLat);
  if(this.fullscreen){
    this.showFullscreen();
  }
    }else{
this.crearMapa();

    }

  }


  irMarcador(longLat) {
   
    if (longLat) {
      this.mapa.flyTo(
        { center: longLat, zoom: 4 }
      )

    }
    }
}
