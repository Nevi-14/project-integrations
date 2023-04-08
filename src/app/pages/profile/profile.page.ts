import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import avatarArray from '../../../assets/data/avatars.json';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  avatarSlide = {
    initialSlide: 0,
    zoom: false,
    slidesPerView: 3,
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
      slidesPerView: 1,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 40
    },
     // when window width is >= 940px
     940: {
      slidesPerView: 3,
      spaceBetween: 40
    },

     // when window width is >= 1200px
    
  },
  }
  imgs = avatarArray;
  avatarActual = this.imgs[0].img;
  index = 0;
  constructor(
public modalCtrl: ModalController

  ) { }

  ngOnInit() {
  }
  cerrarModal(){

this.modalCtrl.dismiss();
  }

  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    
    this.slides.slideNext();
  }
  async slideChange(){
 ;
 await this.slides.getActiveIndex().then(resp =>{
      this.imgs.forEach(av => av.seleccionado = false);
      this.imgs[resp].seleccionado = true;
     this.index = resp;
   
     this.avatarActual  =  this.imgs[resp].img
    })


 
  }

  seleccionarAvatar(img, i){
    
 
    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
this.index = i;
this.avatarActual =  this.imgs[i].img
 
 
    }
}
