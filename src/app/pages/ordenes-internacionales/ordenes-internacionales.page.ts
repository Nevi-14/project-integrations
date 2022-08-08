import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaisesContientes } from 'src/app/models/paisescontientes';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { Ordenes } from '../../models/ordenes';

@Component({
  selector: 'app-ordenes-internacionales',
  templateUrl: './ordenes-internacionales.page.html',
  styleUrls: ['./ordenes-internacionales.page.scss'],
})
export class OrdenesInternacionalesPage implements OnInit {
@Input() estado:string;
paises: PaisesContientes[];
ordenes:Ordenes[];
textoBuscar = '';
  constructor(
public modalCtrl:ModalController,
public localizacionService: LocalizacionService

  ) { }

  ngOnInit() {
    this.localizacionService.syncPaisesContinentesToPromise().then(paises=>{
      this.paises = paises;
      console.log('paises', paises)
      });
  }
  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
  cerrarModal(){

this.modalCtrl.dismiss();
  }

}
