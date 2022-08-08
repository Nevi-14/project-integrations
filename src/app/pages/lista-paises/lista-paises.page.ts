import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaisesContientes } from 'src/app/models/paisescontientes';
import { LocalizacionService } from 'src/app/services/localizacion.service';

@Component({
  selector: 'app-lista-paises',
  templateUrl: './lista-paises.page.html',
  styleUrls: ['./lista-paises.page.scss'],
})
export class ListaPaisesPage implements OnInit {
paises:PaisesContientes[];
textoBuscar = '';
  constructor(
    public modalCtrl:ModalController,
    public localizationService:LocalizacionService
  ) { }

  ngOnInit() {
    this.localizationService.syncPaisesContinentesToPromise().then(paises=>{
      this.paises = paises;
      console.log('paises', paises);
    })
  }

  cerrarModal(){
    this.modalCtrl.dismiss()
  }

  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }

  retornarPais(pais){
this.modalCtrl.dismiss({
  pais:pais
})
  }
}
