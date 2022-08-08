import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ordenes-internacionales',
  templateUrl: './ordenes-internacionales.page.html',
  styleUrls: ['./ordenes-internacionales.page.scss'],
})
export class OrdenesInternacionalesPage implements OnInit {
@Input() estado:string;
  constructor(
public modalCtrl:ModalController

  ) { }

  ngOnInit() {
  }

  cerrarModal(){

this.modalCtrl.dismiss();
  }
}
