import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Articulos } from 'src/app/models/articulos';
import { PaisesContientes } from 'src/app/models/paisescontientes';
import { Proveedores } from 'src/app/models/proveedores';
import { ArticulosService } from 'src/app/services/articulos.service';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { CalendarioPopoverPage } from '../calendario-popover/calendario-popover.page';
import { ListaProveedoresPage } from '../lista-proveedores/lista-proveedores.page';
import { ListaPaisesPage } from '../lista-paises/lista-paises.page';
import { Ordenes } from 'src/app/models/ordenes';
import { ListaArticulosPage } from '../lista-articulos/lista-articulos.page';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-formulario-compras-internacionales',
  templateUrl: './formulario-compras-internacionales.page.html',
  styleUrls: ['./formulario-compras-internacionales.page.scss'],
})
export class FormularioComprasInternacionalesPage implements OnInit {
  orden:Ordenes ={
No_Orden : null,
Abreviacion_Pais: null,
Fecha : new Date().toLocaleDateString(),
Fecha_Pedido: new Date().toLocaleDateString(),
SKU:'',
Estado : 'Planificación',
Cod_Proveedor: null,
Item: null,
Marca: null,
Informacion: null

  }
  articulo:ArticulosService
  paises:PaisesContientes[];
  provedores:Proveedores[];
  proveedor:Proveedores = null;
  pais:PaisesContientes = null;
  articulos:Articulos[];
  fecha =  new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';
  dia = new Date();
  date = this.dia.getDate();
  month = this.dia.getMonth();
  year = this.dia.getFullYear();
  formatoFecha = new Date().toJSON().slice(0, 10).replace(/[/]/g,'-')+'T00:00:00';
  constructor(
public modalCtrl:ModalController,
public localizacionService: LocalizacionService,
public proovedoresService:ProveedoresService,
public articulosService:ArticulosService,
public popOverCtrl: PopoverController,
public alertasService:AlertasService

  ) { }

  ngOnInit() {
    this.localizacionService.syncPaisesContinentesToPromise().then(paises=>{
      this.paises = paises;
      console.log('paises', paises)

      });
    }

  cerrarModal(){
    this.modalCtrl.dismiss();


  }

  async  listaProveedores(){
    let modal = await  this.modalCtrl.create({
      component:ListaProveedoresPage,
      cssClass: 'large-modal',
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data != undefined){
  
      this.proveedor = data.proveedor;
      this.articulos = [];
      console.log('proveedor', this.proveedor)
    
      this.orden.Cod_Proveedor = this.proveedor.ID;
      this.articulosService.syncGetArticulos(this.proveedor.ID);
    }
  }
  async  listaPaises(){
    let modal = await  this.modalCtrl.create({
      component:ListaPaisesPage,
      cssClass: 'large-modal',
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data != undefined){
  this.pais = data.pais;
  this.orden.Abreviacion_Pais = this.pais.Abreviacion_Pais;
  console.log('Pais', this.pais)

    }
  }

  async calendarioPopOver() {
    const popover = await this.popOverCtrl.create({
      component: CalendarioPopoverPage,
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps : {
        fecha:this.fecha
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
    this.fecha = data.fecha;
   
    this.orden.Fecha_Pedido = new Date(data.fecha).toLocaleDateString();

    }
  }


  retornarValor(){

    this.modalCtrl.dismiss({
      orden:this.orden
    })
  }

  async  listaArticulos(){
  if(!this.proveedor){
this.alertasService.message('DIONE', 'Selecciona un Proveedor!.')
    return
  }

    let modal = await  this.modalCtrl.create({
      component:ListaArticulosPage,
      cssClass: 'large-modal',
   
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
       if(data !=undefined){
      this.articulo = data.articulo;
        this.orden.SKU = data.articulo.ARTICULO
       }
    
  }


}
