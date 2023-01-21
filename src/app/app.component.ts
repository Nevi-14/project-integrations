import { Component } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';import { SettingsService } from './services/settings.service';
;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public settingsService: SettingsService

  ) {}

  ngOnInit(){
 
this.settingsService.getCurrentURL();
    (mapboxgl as any ).accessToken = environment.mapboxKey;
 
  
   }
}
