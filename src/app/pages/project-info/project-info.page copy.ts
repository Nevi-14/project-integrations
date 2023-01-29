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
    { title: 'Project-Info', url: '/home/project-info', icon: 'home' },
    { title: 'Profile', url: '/home/profile', icon: 'person' },
    { title: 'Dashboard', url: '/home/dashboard', icon: 'analytics' }
   
  ];
  constructor(
public settingsService: SettingsService

  ) { }

  ngOnInit() {

 
  }
  ionViewWillEnter(){
    this.settingsService.getCurrentURL();

  }

  setTitle(title){
    this.settingsService.title = title;
    this.settingsService.getCurrentURL();
    
    }
}
