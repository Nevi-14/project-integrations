import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-formulario-compras-internacionales',
  templateUrl: './formulario-compras-internacionales.page.html',
  styleUrls: ['./formulario-compras-internacionales.page.scss'],
})
export class FormularioComprasInternacionalesPage implements OnInit {

  constructor(
public modalCtrl:ModalController

  ) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();


  }
}
