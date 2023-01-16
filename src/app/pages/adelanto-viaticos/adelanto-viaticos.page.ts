import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-adelanto-viaticos',
  templateUrl: './adelanto-viaticos.page.html',
  styleUrls: ['./adelanto-viaticos.page.scss'],
})
export class AdelantoViaticosPage implements OnInit {

  constructor(
public modalCtrl:ModalController

  ) { }

  ngOnInit() {
  }
  cerrarModal(){
this.modalCtrl.dismiss();

  }

  changeListener($event){

    
  }
}
