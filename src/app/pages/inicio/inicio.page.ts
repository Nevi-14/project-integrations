import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform, ModalController } from '@ionic/angular';
import { ConfiguracionesService } from '../../services/configuraciones';
import { PerfilPage } from '../perfil/perfil.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public appPages = [
    { title: 'Inicio', url: '/inicio/detalle', icon: 'home' },
    { title: 'Control Viáticos', url: '/inicio/control-viaticos', icon: 'cash' }
   
  ];

  titulo = 'Inicio'
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
    public configuracionesService: ConfiguracionesService,
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
      
      this.configuracionesService.menu = !this.configuracionesService.menu;

    }
  // CHECKS SCREEN RESIZE LIVE

  @HostListener('window:resize',['$event'])

  private onResize(event){

    this.width = event.target.innerWidth;

    this.toggleMenu();

  }
  async perfil(){
    this.isOpen = true;
    
    
          const modal = await this.modalCtrl.create({
     component:PerfilPage,
     cssClass:'alert-modal'
          });
    
    if(this.isOpen){
    
      modal.present();
      const {data} = await modal.onWillDismiss();
      this.isOpen = false;
      if(data != undefined){
    
         
      }
    }
    
        
    
         }
setTitle(titulo){
this.titulo = titulo;

}
cerrarSesion(){
 
  this.router.navigate(['/inicio-sesion']);
}
}
