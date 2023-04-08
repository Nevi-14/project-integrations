import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';
import { SettingsService } from 'src/app/services/settings.service';
 
@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.page.html',
  styleUrls: ['./project-info.page.scss'],
})
export class ProjectInfoPage implements OnInit {
  image = '../assets/imgs/devCodingLogo.svg';
  public appPages = [
    { title: 'Modules', url: '/home/project-info', icon: 'alert-circle' },
    { title: 'Dashboard', url: '/home/dashboard', icon: 'pie-chart' },
    { title: 'Users', url: '/home/users', icon: 'people' },
    { title: 'Customers', url: '/home/customers', icon: 'briefcase' },
    { title: 'Products', url: '/home/products', icon: 'layers' },
    { title: 'Invoices', url: '/home/invoices', icon: 'receipt' }
   
  ];
  constructor(
public settingsService: SettingsService,
public companiesService:CompaniesService

  ) { }

  ngOnInit() {

 
  }
  ionViewWillEnter(){
   

  }

  setTitle(title){
    this.settingsService.title = title;
  
    
    }
}
