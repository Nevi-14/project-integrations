import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform, ModalController } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings.service';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public appPages = [
    { title: 'Project-Info', url: '/home/project-info', icon: 'home' },
    { title: 'Profile', url: '/home/profile', icon: 'person' },
    { title: 'Dashboard', url: '/home/dashboard', icon: 'analytics' }
   
  ];

  titulo = 'Home'
  class:boolean =false;
  width:number;
  url = '';
  showMenu = false;
  large:boolean;
  small:boolean;
  image = '../assets/islena.png';
  isOpen = false;
  constructor(
    public router: Router,
    public menuCtrl: MenuController,
    public plt:Platform,
    public settingsService: SettingsService,
    public modalCtrl: ModalController
    
    
    ) {}

  ngOnInit() {

    //console.log( this.userService.usuarioActual.Foto)
      this.width = this.plt.width();
    this.toggleMenu()
      }

  // REMVOE MENU ON BIGGER SCREENS
  toggleMenu(){
 
    if(this.width > 768){
      this.large = true;
      this.small = false;
      //this.class = true;
     // this.menuCtrl.toggle('myMenu');
     this.small = false;
    }else{
      this.class = false;
      this.large = false;
      this.small = true;
       // this.menuCtrl.toggle('myMenu');

     
   
  
    }
  
    }

    toggle(){
      this.class = true;
      this.menuCtrl.toggle('myMenu');
      
      this.settingsService.menu = !this.settingsService.menu;

    }
  // CHECKS SCREEN RESIZE LIVE

  @HostListener('window:resize',['$event'])

  private onResize(event){

    this.width = event.target.innerWidth;

    this.toggleMenu();

  }
 
setTitle(title){
this.settingsService.title = title;
this.settingsService.getCurrentURL();

}
cerrarSesion(){
 
  this.router.navigate(['/log-in']);
}
}
