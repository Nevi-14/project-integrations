import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';
interface  Position {
  coords: {
      accuracy: number,
      altitude:number,
      altitudeAccuracy:number,
      heading: number,
      latitude: number,
      longitude: number,
      speed: number,
  },
  timestamp:number,
}
@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
  styles: [
    `
  
    .mapa-container {
      height:100%;
     width:100%;
  
    }

    
    ion-list{
      position: fixed;
      top: 90px;
      right: 0px;
      z-index: 99999;
      height:85%;
      width:220px;
      overflow: hidden;
      overflow-y: auto;
      ::-webkit-scrollbar {
        display: none;
        
      }
    }
    `
  ]
})
export class MapboxComponent implements AfterViewInit {
  @Input() lngLat: [number,number];
  @ViewChild('mapa') divMapa!:ElementRef;
  @Input() height: string;
  @Input() width: string;
  @Input() interactive: boolean;
  @Input() location: boolean = false;
  array :any;
  constructor() { }



  ngAfterViewInit(): void {

 

    if(this.lngLat == undefined){

      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (position: Position) =>{

          if(position){
            console.log('position', position)
            
            let latitud = position.coords.latitude;
            let longitud = position.coords.longitude;
            this.lngLat = [longitud, latitud]
            this.loadMap()
          }
          
        }, error =>{
          console.log('error', error)
        })
      }else{

        console.log('Geolocation is not supported by your browser.')
      }
    }


    

  
     
  }


  loadMap(){
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.lngLat,
      zoom:14,
        interactive:this.interactive
      });


  // Create a default Marker and add it to the map.
const newMarker = new mapboxgl.Marker({  draggable: true})
.setLngLat(this.lngLat)
.addTo(mapa);


newMarker.on('dragend', ()=>{

  const { lng, lat } = newMarker!.getLngLat();
  this.lngLat  = [lng, lat];
this.ngAfterViewInit();
})

mapa.addControl(new mapboxgl.NavigationControl());
mapa.addControl(new mapboxgl.FullscreenControl());
mapa.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));



      mapa.on('load', () => {
        mapa.resize();
      });
  }



}
