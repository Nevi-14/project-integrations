import { Component, OnInit } from '@angular/core';
import { AdelantoViaticosPage } from '../adelanto-viaticos/adelanto-viaticos.page';
import { ModalController } from '@ionic/angular';
import { EstadoCuentaPage } from '../estado-cuenta/estado-cuenta.page';
import { FiltrarGastosPage } from '../filtrar-gastos/filtrar-gastos.page';

@Component({
  selector: 'app-control-viaticos',
  templateUrl: './control-viaticos.page.html',
  styleUrls: ['./control-viaticos.page.scss'],
})
export class ControlViaticosPage implements OnInit {
  isOpen = false;
  constructor(
public modalCtrl: ModalController

  ) { }

  ngOnInit() {
  }
  async adelantoViaticos(){
    this.isOpen = true;
        
          const modal = await this.modalCtrl.create({
     component:AdelantoViaticosPage,
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

  async filtrarGastos(){
    this.isOpen = true;
        
          const modal = await this.modalCtrl.create({
     component:FiltrarGastosPage,
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
  async estadoCuenta(){
    this.isOpen = true;
    
    
          const modal = await this.modalCtrl.create({
     component:EstadoCuentaPage,
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
}
