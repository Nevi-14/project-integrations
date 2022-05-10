import { Component, OnInit } from '@angular/core';
import { IonGrid, ModalController } from '@ionic/angular';
import { Articulos } from 'src/app/models/articulos';
import { AlertasService } from 'src/app/services/alertas.service';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.page.html',
  styleUrls: ['./lista-articulos.page.scss'],
})
export class ListaArticulosPage implements OnInit {
  textoBuscar = '';
  constructor(
    public modalCtrl: ModalController,
    public articulosService:ArticulosService,
    public alertasService:AlertasService
  ) { }

  ngOnInit() {

  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  agregarArticulo(articulo:Articulos){


    if( !articulo.SELECTED ){

      this.articulosService.articulosProveedor.push(articulo);
      this.alertasService.message('ISLEÑA', 'Articulo ' + articulo.ARTICULO +' '+'se agrego a la lista');
    }else{
 
      let i =  this.articulosService.articulosProveedor.findIndex(art => art.ARTICULO == articulo.ARTICULO)
    if(i >=0){
      this.articulosService.articulosProveedor.splice(i,1);
      this.alertasService.message('ISLEÑA', 'Articulo ' + articulo.ARTICULO +' '+'se elimino de la lista');
    }
    }
  	console.log(  this.articulosService.articulosProveedor);//it is working !!!

  }

  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }


}
