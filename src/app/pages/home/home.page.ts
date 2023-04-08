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
    { title: 'Project-info', url: '/home/project-info', icon: 'alert-circle' },
    { title: 'Dashboard', url: '/home/dashboard', icon: 'pie-chart' },
    { title: 'Users', url: '/home/users', icon: 'people' },
    { title: 'Customers', url: '/home/customers', icon: 'briefcase' },
    { title: 'Products', url: '/home/products', icon: 'layers' },
    { title: 'Invoices', url: '/home/invoices', icon: 'receipt' },
    { title: 'Log-out', url: '/index', icon: 'exit' }
   
  ];
  titulo = 'Inicio'
  class: boolean = false;
  width: number;
  url = '';
  showMenu = false;
  large: boolean;
  small: boolean;
  image = '../assets/islena.png';
  isOpen = false;
  constructor(
    public router: Router,
    public menuCtrl: MenuController,
    public plt: Platform,
    public settingsService: SettingsService,
    public modalCtrl: ModalController


  ) { }

  dkmrg() {
    this.menuCtrl.swipeGesture(true)
  }
  ngOnInit() {

    //console.log( this.userService.usuarioActual.Foto)
    this.width = this.plt.width();
    this.toggleMenu()
  }

  // REMVOE MENU ON BIGGER SCREENS
  menuAction(url) {
    this.class = false;
    this.settingsService.menu = false;
    if (url == 'perfil') {
      this.perfil();
    } else if (url == 'salir') {
      this.cerrarSesion();
    } else {
      this.router.navigateByUrl(url, { replaceUrl: true })
    }

  }
  openMenu() {
    if (!this.settingsService.menu) {
      this.class = true;
      this.menuCtrl.open();
      this.settingsService.menu = true;
    }

  }

  closeMenu() {
    if (this.settingsService.menu) {
      this.class = false;
      this.menuCtrl.close();
      this.settingsService.menu = false;
    }

  }
  toggleMenu() {

    if (this.width > 768) {
      this.large = true;
      this.small = false;
      //this.class = true;
      // this.menuCtrl.toggle('myMenu');
      this.small = false;
    } else {
      this.class = false;
      this.large = false;
      this.small = true;
      // this.menuCtrl.toggle('myMenu');




    }

  }

  toggle() {
    this.class = true;
    this.menuCtrl.toggle('myMenu');

    this.settingsService.menu = !this.settingsService.menu;

  }
  // CHECKS SCREEN RESIZE LIVE

  @HostListener('window:resize', ['$event'])

  private onResize(event) {

    this.width = event.target.innerWidth;

    this.toggleMenu();

  }
  async perfil() {
    this.isOpen = true;





  }
  setTitle(titulo) {
    this.settingsService.title = titulo;
    this.settingsService.menu = false;

  }
  cerrarSesion() {

    this.router.navigate(['/inicio-sesion']);
    localStorage.removeItem('usuario')
  }
}

