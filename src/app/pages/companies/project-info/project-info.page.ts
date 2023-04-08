import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
 
@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.page.html',
  styleUrls: ['./project-info.page.scss'],
})
export class ProjectInfoPage implements OnInit {
  image = '../assets/imgs/devCodingLogo.svg';
  public appPages = [
    { title: 'Modules', url: '/home/companies/project-info', icon: 'alert-circle' },
    { title: 'Dashboard', url: '/home/companies/company-board', icon: 'pie-chart' },
    { title: 'Users', url: '/home/companies/users', icon: 'people' },
    { title: 'Customers', url: '/home/companies/customers', icon: 'briefcase' },
    { title: 'Products', url: '/home/companies/products', icon: 'layers' },
    { title: 'Invoices', url: '/home/companies/invoices', icon: 'receipt' }
   
  ];
  constructor(
public settingsService: SettingsService

  ) { }

  ngOnInit() {

 
  }
  ionViewWillEnter(){
   

  }

  setTitle(title){
    this.settingsService.title = title;
  
    
    }
}
