import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';
import * as  mapboxgl from 'mapbox-gl';
import { ModalController } from '@ionic/angular';
import { FormularioComprasInternacionalesPage } from '../formulario-compras-internacionales/formulario-compras-internacionales.page';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { Contientes } from 'src/app/models/continentes';
import { OrdenesInternacionalesPage } from '../ordenes-internacionales/ordenes-internacionales.page';
import { PaisesContientes } from 'src/app/models/paisescontientes';

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
  continentes:Contientes[];
  paises:PaisesContientes[];
  fullscreen = false;
  estados = [
    {id:1,estado:'Planificaión'},
    {id:2,estado:'Producción'},
    {id:3,estado:'Terminado'},
    {id:4,estado:'Liberación y pago'},
  
  ]
  constructor(
public alertasService:AlertasService,
public modalCtrl: ModalController,
public localizacionService:LocalizacionService

  ) { }

  ngOnInit() {
    this.continentes = [];
  this.localizacionService.syncContinentesToPromise().then(continentes =>{
    this.continentes = continentes;
console.log('continentes', continentes)

this.localizacionService.syncPaisesContinentesToPromise().then(paises=>{
this.paises = paises;
console.log('paises', paises)
});

  });
  }
  ngAfterViewInit() {
    this.crearMapa();
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
    .togglePopup();

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

    let modal = await this.modalCtrl.create({
    component:FormularioComprasInternacionalesPage,
    cssClass:'my-custom-modal',
    mode:'ios'
    });

  return await modal.present();

  }

  async ordenesInternacionales(estado){
  

    let modal = await this.modalCtrl.create({
    component:OrdenesInternacionalesPage,
    cssClass:'fullscreen-large-modal',
    mode:'md',
    componentProps:{
      estado:estado
    }
    });

  return await modal.present();

  }
  filtrar($event){

    let data:Contientes = $event.detail.value;

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
        { center: longLat, zoom: 1.5 }
      )

    }
    }
}
