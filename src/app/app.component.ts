import { Component } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translateService: TranslateService

  ) {
    this.translateService.setDefaultLang('English');
    this.translateService.addLangs(['English','Spanish']);
  }

  ngOnInit(){
    (mapboxgl as any ).accessToken = environment.mapboxKey;
 
  
   }
}
