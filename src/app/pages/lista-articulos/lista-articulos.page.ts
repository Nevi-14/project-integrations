import { Component, OnInit } from '@angular/core';
import { IonGrid, ModalController } from '@ionic/angular';
import { Articulos } from 'src/app/models/articulos';
import { AlertasService } from 'src/app/services/alertas.service';
import { ArticulosService } from 'src/app/services/articulos.service';
interface PostArticulos {
  articulo:Articulos,
  PAL:number,
  Cajas:number,
  Total: number
}
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
  let articuloPostArray: PostArticulos = {
      articulo:articulo,
      PAL:0,
      Cajas:0,
      Total: 0

  }
  this.articulosService.articulosPostArray.push(articuloPostArray);
    
      this.alertasService.message('ISLEÑA', 'Articulo ' + articulo.ARTICULO +' '+'se agrego a la lista');
    }else{
 
      let i =  this.articulosService.articulosPostArray.findIndex(art => art.articulo.ARTICULO == articulo.ARTICULO)
    if(i >=0){
      this.articulosService.articulosPostArray.splice(i,1);
      this.alertasService.message('ISLEÑA', 'Articulo ' + articulo.ARTICULO +' '+'se elimino de la lista');
    }

    
    }
  	console.log(  this.articulosService.articulosPostArray);//it is working !!!

  }

  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }


}
