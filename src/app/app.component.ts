import { Component } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';;
import { ConfiguracionesService } from './services/configuraciones';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
public configuracionesService: ConfiguracionesService

  ) {}

  ngOnInit(){
 
this.configuracionesService.getURL();
    (mapboxgl as any ).accessToken = environment.mapboxKey;
 
  
   }
}
