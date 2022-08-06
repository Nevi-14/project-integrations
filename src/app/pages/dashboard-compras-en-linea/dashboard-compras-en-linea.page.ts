import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';
import * as  mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-dashboard-compras-en-linea',
  templateUrl: './dashboard-compras-en-linea.page.html',
  styleUrls: ['./dashboard-compras-en-linea.page.scss'],
 
})
export class DashboardComprasEnLineaPage implements OnInit, AfterViewInit {
  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!: mapboxgl.Map;
  lngLat: [number, number] = [ -84.14123589305028, 9.982628288210657 ];
  zoomLevel: number = 12;
  constructor(
public alertasService:AlertasService

  ) { }

  ngOnInit() {
  
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
      style: 'mapbox://styles/mapbox/light-v10', // Specify which map style to use
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



 this.mapa.on('load', () => {
     
  this.mapa.resize();
});





  }
}
