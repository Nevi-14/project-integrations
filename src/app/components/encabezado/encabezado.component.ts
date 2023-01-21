import { Component, Input, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { SettingsService } from '../../services/settings.service';



@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent implements OnInit {
@Input()titulo;
fecha = new Date().toLocaleDateString();
  constructor(
    public menuCtrl: MenuController,
    private plt:Platform,
    public settingsService: SettingsService
    
      ) {}

  ngOnInit() {}
  toggle(){
 this.settingsService.menu = !this.settingsService.menu ;
    this.menuCtrl.toggle('myMenu');
  
  }
}
