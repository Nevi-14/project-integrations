import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';  // Convierte excel a objeto
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { GestionOrdenesService } from '../../services/gestion-ordenes.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { Lineas } from '../../models/lineas copy';
import { BodegasService } from 'src/app/services/bodegas.service';
interface array {
  Bodega:string,
  Codigo_Proovedor:number,
  Proveedor:string,
  Codigo_Producto:number,
  Descripcion: string,
  Unidades:string

}
interface ArticulosA {
  Codigo_Producto:number,
  Descripcion: string,
  Unidades:string
}
interface Data{
  Proveedor:string,
  Codigo_Proveedor:number,
  Bodega: string,
  Articulos:ArticulosA[]

}

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
@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.page.html',
  styleUrls: ['./bulk.page.scss'],
})
export class BulkPage implements OnInit {
  array:array [] =[]
   myArray:Data[] = [];
  constructor(
public proveedoresService: ProveedoresService,
public gestionOrdenesService: GestionOrdenesService,
public articulosService: ArticulosService,
public bodegasService:BodegasService

  ) { }

  ngOnInit() {
  }

  CargarOrden(item:Data){

    console.log(item)

    this.proveedoresService.syncGetProvedorestoPromise(this.gestionOrdenesService.ordenCompra.PROVEEDOR).then(resp =>{
      this.proveedoresService.proveedores = resp;

      let b = this.bodegasService.bodegas.findIndex(bodega => bodega.BODEGA == item.Bodega)
    if(b >=0){

      this.gestionOrdenesService.bodega = this.bodegasService.bodegas[b];
    }
      
      let p =    this.proveedoresService.proveedores.findIndex(proveedor => proveedor.ID == item.Codigo_Proveedor);
      if(p >=0){
        this.gestionOrdenesService.proveedor = this.proveedoresService.proveedores[p];
        console.log('proveedor',this.proveedoresService.proveedores[p])
        this.articulosService.syncGetArticulosToPromise(item.Codigo_Proveedor).then(articulos =>{
          this.articulosService.articulos = articulos;
              

          for(let i = 0 ; i< item.Articulos.length; i++){

let a = this.articulosService.articulos.findIndex(arti => arti.ARTICULO == item.Articulos[i].Codigo_Producto);

if(a >=0){

  this.gestionOrdenesService.ordenCompra.BODEGA = this.gestionOrdenesService.bodega.BODEGA;
  let articulo =  {
    articulo  : {
      ORDEN_COMPRA: null,
      ORDEN_COMPRA_LINEA: null,
      ARTICULO: this.articulosService.articulos[a].ARTICULO,
      BODEGA: item.Bodega,
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

this.gestionOrdenesService.articulos.push(articulo)



}else{

console.log('articulo no encontrado', item)


}
        
            if(i == this.articulosService.articulos.length -1){
              console.log('articulos',articulos)

            }
          }
        
                  })
      }


    })


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
this.array = data;

// console.log(this.array, 'data')

for(let i =0; i < this.array.length; i++){
let a = this.myArray.findIndex(datos=> datos.Codigo_Proveedor == this.array[i].Codigo_Proovedor);

if(a >=0){

this.myArray[a].Articulos.push(
{
  Codigo_Producto:this.array[i].Codigo_Producto,
  Descripcion: this.array[i].Descripcion,
  Unidades:this.array[i].Unidades

}
)
}else{
this.myArray.push(
{
  Proveedor:this.array[i].Proveedor,
  Codigo_Proveedor:this.array[i].Codigo_Proovedor,
  Bodega: this.array[i].Bodega,
  Articulos:[
{
Codigo_Producto:this.array[i].Codigo_Producto,
Descripcion: this.array[i].Descripcion,
Unidades:this.array[i].Unidades

}

  ]
}
)

}

  if(i == this.array.length -1){

    console.log('myArray', this.myArray)
  }
}

//this.convertedJson = JSON.stringify(data, undefined, 4);
      });
      console.log(workbook)

    }
  }
}
