import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';
 
import { IonSlides, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterPage } from '../register/register.page';
import { IndustriesPage } from '../industries/industries.page';
import { TranslateService } from '@ngx-translate/core'
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexPage implements OnInit {
  @ViewChild('mapa') divMapa!:ElementRef;

  langs: string []=[];
  lng = 'English';
  mapa!: mapboxgl.Map;
  date = new Date().getFullYear();
isModalOpen = false;
width = null;
interactive= true;
slideOpts =  {
  initialSlide: 0,
  zoom: false,
  slidesPerView: 2,
  spaceBetween: 10,
  centeredSlides: false,
  autoplay:false,
  speed: 500,
  // Responsive breakpoints
breakpoints: {
  // when window width is >= 320px
  320: {
    slidesPerView: 1,
    spaceBetween: 20
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 2,
    spaceBetween: 30
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 2,
    spaceBetween: 40
  },
   // when window width is >= 940px
   940: {
    slidesPerView: 1,
    spaceBetween: 40
  },

   // when window width is >= 1200px
  
},
};
  company = {
    name : 'Dev-Coding',
    services:[
      {
        type:'Almacenamiento',
        img:'assets/imgs/hosting.svg',
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam consequatur accusantium itaque quidem, numquam esse nemo, sed voluptas unde id quae tenetur qui et consectetur aspernatur atque nostrum neque in!'
      },
      {
        type:'Desarrollo Web',
        img:'assets/imgs/web-design.svg',
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam consequatur accusantium itaque quidem, numquam esse nemo, sed voluptas unde id quae tenetur qui et consectetur aspernatur atque nostrum neque in!'
      },
      {
        type:'Desarrollo Movil',
        img:'assets/imgs/user-interface.svg',
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam consequatur accusantium itaque quidem, numquam esse nemo, sed voluptas unde id quae tenetur qui et consectetur aspernatur atque nostrum neque in!'
      },
      {
        type:'Administración de Bases de Datos',
        img:'assets/imgs/database.svg',
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam consequatur accusantium itaque quidem, numquam esse nemo, sed voluptas unde id quae tenetur qui et consectetur aspernatur atque nostrum neque in!'
      },
      {
        type:'Venta de plantillas de diseño',
        img:'assets/imgs/programming.svg',
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam consequatur accusantium itaque quidem, numquam esse nemo, sed voluptas unde id quae tenetur qui et consectetur aspernatur atque nostrum neque in!'
      },
      {
        type:'Venta de software',
        img:'assets/imgs/software.svg',
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam consequatur accusantium itaque quidem, numquam esse nemo, sed voluptas unde id quae tenetur qui et consectetur aspernatur atque nostrum neque in!'
      },
      {
        type:'Mantenimiento',
        img:'assets/imgs/maintenance.svg',
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam consequatur accusantium itaque quidem, numquam esse nemo, sed voluptas unde id quae tenetur qui et consectetur aspernatur atque nostrum neque in!'
      }
    ]
  }
  private slides: any;
  isOpen = false;
  constructor(
public modalCtrl:ModalController,
public router: Router,
private translateService: TranslateService,
public  settingsService:SettingsService



  ) {
this.langs = this.translateService.getLangs();


   }
   setSwiperInstance(swiper: any) {
    this.slides = swiper;
  }
  ngOnInit() {
    this.toggleMenu(window.innerWidth);

  }
  changeLang($event){

    const value = $event.detail.value;
    this.settingsService.language = value;
    this.translateService.use(value);

  }

  async segmentChanged($event){

/**
 * await this.slider.slideTo(this.segment);
this.slider.update();
 */

  }

  ngAfterViewInit() {
 
  //  this.createMap();
    }

   async  register(){

      this.isModalOpen = true;

      const modal = await this.modalCtrl.create({
        component:RegisterPage,
        mode:'ios',
        cssClass:'ui-modal'
      })

      if(this.isModalOpen){

      modal.present();

      const {data} = await modal.onDidDismiss();
      this.isModalOpen = false;

      if(data != undefined){
        console.log('data')
        this.industries();
      }
      }
      
    }

    cerrarModal(){
this.modalCtrl.dismiss();

    }
    async  industries(){

      this.isModalOpen = true;

      const modal = await this.modalCtrl.create({
        component:IndustriesPage,
        cssClass:'ui-modal'
      })

      if(this.isModalOpen){

      modal.present();

      const {data} = await modal.onDidDismiss();
      this.isModalOpen = false;
      if(data != undefined){
        console.log('data')
      }
      }
      
    }


logIn(){
  this.router.navigateByUrl('/log-in',{replaceUrl:true})
}

    createMap(){
      if(this.mapa){
    
        this.mapa.remove();
      
        }  
        this.mapa = new mapboxgl.Map({
        container: this.divMapa.nativeElement,
        style: 'mapbox://styles/mapbox/light-v10', // Specify which map style to use
        center:[ -84.1165100,10.0023600],
        zoom:10,
          interactive:this.interactive
        });
    
    
    // Create a default Marker and add it to the map.
    const newMarker = new mapboxgl.Marker({ color:"#010203",  draggable: false})
    newMarker.setLngLat([ -84.1165100,10.0023600])
        .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setText("Dev-Coding"))
        .addTo(this.mapa)
        .togglePopup()
    
    
    
    this.mapa.addControl(new mapboxgl.NavigationControl());
    

  
  
    
        this.mapa.on('load', () => {
  
          this.mapa.resize();
        });
    
      
    }


  toggleMenu(width){

    if(width > 768){
      this.width = '70vw';
  
  
    }else{
  
      this.width = '100vw';
  
  
    }
  
    }  
  @HostListener('window:resize',['$event'])

  private onResize(event){

    const newWidth = event.target.innerWidth;

this.toggleMenu(newWidth);
 // alert([newWidth, this.storeService.sliderOpts.slidesPerView])

  }
}
