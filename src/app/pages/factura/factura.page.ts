import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GestionOrdenesService } from '../../services/gestion-ordenes.service';
import { LiquidacionesService } from '../../services/liquidaciones.service';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  factura = {
    ORDEN_COMPRA :null,
    FACTURA:null,
    DESCRIPCION:null,
    FECHA:null,
    MONTO:null,
    MONEDA:null,
  }

  actualizar = false;
  constructor(
public modalCtrl: ModalController,
public gestionOrdenesService: GestionOrdenesService,
public liquidacionesService: LiquidacionesService,
public alertasService: AlertasService

  ) { }

  ngOnInit() {

    this.liquidacionesService.syncGetByID(this.gestionOrdenesService.ordenCompra.ORDEN_COMPRA).then(resp =>{


   if(resp.length > 0){

    this.factura = {
      ORDEN_COMPRA :resp[0].ORDEN_COMPRA,
      FACTURA :resp[0].FACTURA,
      DESCRIPCION:resp[0].DESCRIPCION,
      FECHA:resp[0].FECHA,
      MONTO:resp[0].MONTO,
      MONEDA:resp[0].MONEDA
    }
this.actualizar = true;
   }else{
    this.cargarFactura();


   }
    })
    
  }

  cerrarModal(){

this.modalCtrl.dismiss();
  }
  cargarFactura(){
 
          this.factura = {
            ORDEN_COMPRA :this.gestionOrdenesService.ordenCompra.ORDEN_COMPRA,
            FACTURA :this.gestionOrdenesService.ordenCompra.ORDEN_COMPRA+new Date().getHours()+'-'+new Date().getMinutes()+'-'+new Date().getMilliseconds(),
            DESCRIPCION: 'Orden de compra ',
            FECHA:this.gestionOrdenesService.ordenCompra.FECHA  ? this.gestionOrdenesService.ordenCompra.FECHA  : new Date().toISOString().split('T')[0],
            MONTO:this.gestionOrdenesService.ordenCompra.TOTAL_A_COMPRAR,
            MONEDA:this.gestionOrdenesService.ordenCompra.MONEDA
          }
        }


        nuevaFactura(){

          this.factura = {
            ORDEN_COMPRA :this.gestionOrdenesService.ordenCompra.ORDEN_COMPRA,
            FACTURA :this.gestionOrdenesService.ordenCompra.ORDEN_COMPRA+new Date().getHours()+'-'+new Date().getMinutes()+'-'+new Date().getMilliseconds(),
            DESCRIPCION: 'Orden de compra ',
            FECHA:this.gestionOrdenesService.ordenCompra.FECHA  ? this.gestionOrdenesService.ordenCompra.FECHA  : new Date().toISOString().split('T')[0],
            MONTO:this.gestionOrdenesService.ordenCompra.TOTAL_A_COMPRAR,
            MONEDA:this.gestionOrdenesService.ordenCompra.MONEDA
          }

        }
  generarPost(){


    if(this.actualizar){
      this.liquidacionesService.syncPutToPromise(this.factura).then(resp =>{
        this.actualizar = true;
              console.log(resp)
              this.alertasService.message('DIONE', 'Factura Actualizada');
          
        
         //     this.cerrarModal();
            }, error =>{
              this.alertasService.message('DIONE', 'Error');
              console.log(error)
            })

    }else{

      this.liquidacionesService.syncPostToPromise([this.factura]).then(resp =>{
        this.actualizar = true;
              console.log(resp)
              this.alertasService.message('DIONE', 'Factura Guardada');
              console.log('post completed')
        
         //     this.cerrarModal();
            }, error =>{
              this.alertasService.message('DIONE', 'Error');
              console.log(error)
            })

    }

   
  }
}
