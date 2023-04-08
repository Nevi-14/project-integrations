import { Component, Input, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
@Input()titulo;
fecha = new Date().toLocaleDateString();
  constructor(
    public menuCtrl: MenuController,
    private plt:Platform,
    public settingsService: SettingsService,
    public router: Router
    
      ) {}

  ngOnInit() {}
  toggle(){
 this.settingsService.menu = !this.settingsService.menu ;
    this.menuCtrl.toggle('myMenu');
  
  }

  settings(){
this.router.navigateByUrl('/home/companies/company-settings', {replaceUrl:true})
  }

  calendar(){
    this.router.navigateByUrl('/home/companies/company-calendar', {replaceUrl:true})
      }


     
}
