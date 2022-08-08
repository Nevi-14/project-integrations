import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';
import * as  mapboxgl from 'mapbox-gl';
import { ModalController } from '@ionic/angular';
import { FormularioComprasInternacionalesPage } from '../formulario-compras-internacionales/formulario-compras-internacionales.page';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { Continentes } from 'src/app/models/continentes';
import { OrdenesInternacionalesPage } from '../ordenes-internacionales/ordenes-internacionales.page';
import { PaisesContientes } from 'src/app/models/paisescontientes';
import { Ordenes } from '../../models/ordenes';

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
  paises:PaisesContientes[];
  ordenes:Ordenes[];
  fullscreen = false;
  estados = [
    {id:1,estado:'Planificaión'},
    {id:2,estado:'Producción'},
    {id:3,estado:'Terminado'},
    {id:4,estado:'Liberación y pago'},
  
  ];
  imagenes = [

'assets/numbers/028-1.svg',
'assets/numbers/029-2.svg',
'assets/numbers/030-3.svg',
'assets/numbers/031-4.svg',
'assets/numbers/032-5.svg',
'assets/numbers/033-6.svg'

  ];
  private modalOpen:boolean = false;
  constructor(
public alertasService:AlertasService,
public modalCtrl: ModalController,
public localizacionService:LocalizacionService

  ) { }

  ngOnInit() {
    this.ordenes = [];
    this.continentes = [];

  }
  ngAfterViewInit() {

    this.localizacionService.syncContinentesToPromise().then(continentes =>{
      this.continentes = continentes;
  console.log('continentes', continentes)
  
  this.localizacionService.syncPaisesContinentesToPromise().then(paises=>{
  this.paises = paises;
  console.log('paises', paises)
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

    for(let i =0; i < this.continentes.length; i++){

    

      const el = document.createElement('div');
      const width = 40;
      const height = 40;
      el.className = 'marker';
      el.style.backgroundImage =  `url(${this.imagenes[i]})`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100%';
       
      el.addEventListener('click', () => {
 
   this.alertasService.message('DIONE', 'Proximamente ' + this.continentes[i].name)
 
      
      });
      new mapboxgl.Marker(el)
      .setLngLat([this.continentes[i].longitud,this.continentes[i].latitud])
      .addTo(this.mapa); 

      if(i == this.continentes.length -1){

      }
    }



    newMarker.setLngLat(this.lngLat)
    .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setText("DISTRIBUIDORA ISLEÑA"))
    .addTo(this.mapa)
  //  .togglePopup();

    this.mapa.addControl(new mapboxgl.NavigationControl());
    this.mapa.addControl(new mapboxgl.FullscreenControl());


 this.mapa.on('load', () => {
     
  this.mapa.resize();
});





  }


  showFullscreen(){
   let container =  this.mapa.getContainer();
   container.requestFullscreen();
  }

  async fomularioComprasInternacionales(){
     
if (!this.modalOpen){
  const modal = await this.modalCtrl.create({
    component:FormularioComprasInternacionalesPage,
    cssClass:'my-custom-modal',
    mode:'ios'
  });
  this.modalOpen = true;

   await modal.present();
   const { data } = await modal.onWillDismiss();

   if(data != undefined){
    console.log('orden', data.orden)
    this.ordenes.push(data.orden)

   }
   this.modalOpen = false;

}




  }

  async ordenesInternacionales(estado){
  
     
if (!this.modalOpen){
  const modal = await this.modalCtrl.create({
    component:OrdenesInternacionalesPage,
    cssClass:'fullscreen-large-modal',
    mode:'md',
    componentProps:{
      estado:estado,
      ordenes:this.ordenes
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

  filtrarEstado($event){
    
  }

  irMarcador(longLat) {
   
    if (longLat) {
      this.mapa.flyTo(
        { center: longLat, zoom: 1.5 }
      )

    }
    }
}
