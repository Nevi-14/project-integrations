import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CalendarioPopoverPage } from '../calendario-popover/calendario-popover.page';

@Component({
  selector: 'app-filtrar-gastos',
  templateUrl: './filtrar-gastos.page.html',
  styleUrls: ['./filtrar-gastos.page.scss'],
})
export class FiltrarGastosPage implements OnInit {
  formatoFecha = new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';
  constructor(
    
    public modalCtrl: ModalController,
    public popOverCtrl: PopoverController
    
    
    
    ) { }

  ngOnInit(

    

  ) {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();


  }
  async fechaPopOver( ) {

  
 
      const popover = await this.popOverCtrl.create({
        component: CalendarioPopoverPage,
        cssClass: 'my-custom-class',
        translucent: true,
        componentProps : {
          fecha:this.formatoFecha
        }
      });
      await popover.present();
    
      const { data } = await popover.onDidDismiss();
    
      if(data != undefined){
       
        let fecha= new Date(data.fecha).toLocaleDateString('Es', {
          year: 'numeric',
          month: '2-digit',
          weekday: 'short',
          day: 'numeric',
        });
        
    
    
      }
    }
}
