import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';  // Convierte excel a objeto
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { GestionOrdenesService } from '../../services/gestion-ordenes.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { Lineas } from '../../models/lineas';
import { BodegasService } from 'src/app/services/bodegas.service';
import { Proveedores } from 'src/app/models/proveedores';
import { Bodegas } from '../../models/bodegas';
import { AlertasService } from 'src/app/services/alertas.service';
import { ModalController } from '@ionic/angular';

interface PostArticulos {

  articulo:Lineas,
  nombre:string,
  cajas:number,
  totalDescuento:number,
  totalImpuesto:number,
  montoSubTotal:number
  montoTotal: number,
  accion:string,
  selected:boolean
}
interface ArticulosA {
  Codigo_Producto:number,
  Descripcion?: string,
  Unidades:number,
  Precio?:number
}
@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.page.html',
  styleUrls: ['./bulk.page.scss'],
})
export class BulkPage implements OnInit {
  array:PostArticulos [] =[]
   myArray:ArticulosA[] = [];
   import:ArticulosA[] = [];
   @ViewChild('myInput')
   myInputVariable: ElementRef;   
   file:any  = null;
   @Input()  proveedor:Proveedores
   @Input() bodega:Bodegas
   @Input() update:boolean
   textoBuscarProveedor = '';
   textoBuscarArticulo = '';
   textoBuscarBodega = '';
  constructor(
public proveedoresService: ProveedoresService,
public gestionOrdenesService: GestionOrdenesService,
public articulosService: ArticulosService,
public bodegasService:BodegasService,
public alertasService:AlertasService,
public modalCtrl: ModalController

  ) { }

  ngOnInit() {

    if(this.update){
     
    }else{
   
    }
 
    if(!this.proveedor && !this.bodega){
      this.gestionOrdenesService.limpiarDatos();
          }

          this.proveedoresService.proveedores = [];
          this.proveedoresService.syncGetProvedorestoPromise('').then(resp =>{
      
            this.proveedoresService.proveedores = resp;
            this.bodegasService.bodegas = [];
            this.bodegasService.syncGetBodegasToPromise().then(resp =>{
      
         this.bodegasService.bodegas = resp;
      
  
        
      
              
            }, error =>{
        
              console.log('error', error)
            });
      
          });
      
       

  }




  onSearchChangeProveedor(event){

    this.textoBuscarProveedor = event.detail.value;
      }

      onSearchChangeBodega(event){

        this.textoBuscarBodega = event.detail.value;
          }


          onSearchChangeArticulo(event){

            this.textoBuscarArticulo = event.detail.value;
              }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  async exportToExcel(data, filename) {
    {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, filename);
   // console.log('XLSX',XLSX.writeFile(wb, filename + '.xlsx'))
   console.log('XLSX',XLSX)

   XLSX.writeFile(wb, filename + '.xlsx')

}
  }

  editarArticulosBULK(){
    
for(let i =0; i < this.import.length; i++){
let a = this.gestionOrdenesService.articulos.findIndex(articulo => articulo.articulo.ARTICULO == this.import[i].Codigo_Producto  );

if(a >=0){
  this.gestionOrdenesService.articulos[a].articulo.CANTIDAD_ORDENADA = this.import[i].Unidades
  this.gestionOrdenesService.articulos[a].articulo.PRECIO_UNITARIO = this.import[i].Precio

  this.gestionOrdenesService.articulos[a].montoSubTotal = this.gestionOrdenesService.articulos[a].articulo.PRECIO_UNITARIO * this.gestionOrdenesService.articulos[a].articulo.CANTIDAD_ORDENADA
  this.gestionOrdenesService.articulos[a].articulo.MONTO_DESCUENTO =  this.gestionOrdenesService.articulos[a].articulo.PRECIO_UNITARIO  *  this.gestionOrdenesService.articulos[a].articulo.PORC_DESCUENTO / 100
  this.gestionOrdenesService.articulos[a].totalDescuento =  this.gestionOrdenesService.articulos[a].articulo.MONTO_DESCUENTO * this.gestionOrdenesService.articulos[a].articulo.CANTIDAD_ORDENADA;
 

  this.gestionOrdenesService.articulos[a].totalImpuesto =  this.gestionOrdenesService.articulos[a].articulo.PRECIO_UNITARIO  *  this.gestionOrdenesService.articulos[a].articulo.IMPUESTO1 / 100 * this.gestionOrdenesService.articulos[a].articulo.CANTIDAD_ORDENADA

  this.gestionOrdenesService.articulos[a].montoTotal =  this.gestionOrdenesService.articulos[a]. montoSubTotal + this.gestionOrdenesService.articulos[a].totalImpuesto -  this.gestionOrdenesService.articulos[a].totalDescuento

 
}
  if(i == this.import.length -1){
this.gestionOrdenesService.sumarTotales();
this.cerrarModal();
  }
}
/**
 * console.log(this.bodega)
console.log(this.proveedor)  
this.file = null;
this.array  = [];
this.myArray  = [];
this.import = [];
 */
      }
  agregarArticulosBULK(){
this.gestionOrdenesService.bodega = this.bodega;
this.gestionOrdenesService.proveedor = this.proveedor;
this.gestionOrdenesService.ordenCompra.BODEGA = this.bodega.BODEGA;
this.gestionOrdenesService.ordenCompra.PROVEEDOR = this.proveedor.ID;
this.gestionOrdenesService.ordenCompra.CONDICION_PAGO = this.proveedor.CONDICION_PAGO;
this.gestionOrdenesService.ordenCompra.MONEDA = this.proveedor.MONEDA;
this.gestionOrdenesService.ordenCompra.PAIS = this.proveedor.PAIS;
this.gestionOrdenesService.ordenCompra.FECHA_REQUERIDA =  new Date().toDateString();
this.gestionOrdenesService.ordenCompra.FECHA =  new Date().toDateString();



for(let i = 0; i <   this.array.length; i++){

  this.array[i].articulo.BODEGA = this.bodega.BODEGA
  this.gestionOrdenesService.articulos.push(this.array[i])
  this.gestionOrdenesService.TOTAL_UNIDADES += this.array[i].articulo.CANTIDAD_ORDENADA
  if(i ==   this.array.length -1){
  
this.modalCtrl.dismiss();

  }
}
  
  }
  CargarOrden(){


  let notFound =[];
    this.articulosService.syncGetArticulosToPromise(this.proveedor.ID).then(articulos =>{
      this.articulosService.articulos = articulos;

      for(let i = 0 ; i< this.import.length; i++){

        let a = this.articulosService.articulos.findIndex(arti => arti.ARTICULO == this.import[i].Codigo_Producto);
        
        if(a >=0){
        
        //  this.gestionOrdenesService.ordenCompra.BODEGA = this.gestionOrdenesService.bodega.BODEGA;
      
        let articulo =  {
          articulo  : {
            ORDEN_COMPRA: null,
            ORDEN_COMPRA_LINEA: null,
            ARTICULO: this.articulosService.articulos[a].ARTICULO,
            BODEGA: null,
            DESCRIPCION: this.articulosService.articulos[a].DESCRIPCION,
            CANTIDAD_ORDENADA: 1,
            CANTIDAD_EMBARCADA: 0,
            CANTIDAD_RECIBIDA: 0,
            CANTIDAD_RECHAZADA: 0,
            PRECIO_UNITARIO: this.articulosService.articulos[a].ULT_PREC_UNITARIO,
            IMPUESTO1: 0,
            IMPUESTO2: 0,
            PORC_DESCUENTO: 0,
            MONTO_DESCUENTO: 0,
            FACTOR_CONVERSION: null,
            CENTRO_COSTO: "001-001-01-01",
            CUENTA_CONTABLE: "00003",
            TIPO_IMPUESTO1: "01",
            TIPO_TARIFA1: "08",
            LOTE :null
        },
        nombre:this.articulosService.articulos[a].DESCRIPCION,
        cajas:0,
        totalDescuento: 0,
        totalImpuesto:0,
        montoSubTotal:0,
        montoTotal:0,
          accion:'I',
          selected:false
      
      
      }
      
      this.array.push(articulo)
        
        
        }else{
          notFound.push(this.import[i])
      
        
        
        }
                
                    if(i == this.import.length -1){
                      console.log('articulos',this.array)
                      if(this.array.length == 0){
 
                        this.alertasService.message('DIONE', 'Verifica que sea el proveedor correcto, no se encontrarona rticulos asociados.')
                      }
             if(notFound.length >0  && this.array.length > 0){

              this.exportToExcel(notFound,'Productos No encontrados ' + this.proveedor.ID);

             }
                     
        
                    }
                  }
          
    });


   
 


  }
  fileUpload(event){


  
    console.log(event.target.files)
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) =>{
      console.log(event);
      let binaryData = event.target.result;
      //  EL METODO READ TIENE DOS PARAMETROS 1 EL BINARY DATA Y EL TIPO
      let workbook = XLSX.read(binaryData, {type:'binary'});
      workbook.SheetNames.forEach(sheet =>{
const data:any = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
console.log(data)
this.import = data;
this.CargarOrden()

 console.log(this.import)

//this.convertedJson = JSON.stringify(data, undefined, 4);
      });
      console.log(workbook)

    }
  }
}
