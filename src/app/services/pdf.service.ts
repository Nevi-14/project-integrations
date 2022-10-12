import { Injectable } from '@angular/core';
import {Img, PageReference, PdfMakeWrapper, Table, TextReference, Txt} from 'pdfmake-wrapper';
import { OrdenCompra } from '../models/ordencompra';
import { Proveedores } from '../models/proveedores';
import { ColonesPipe } from '../pipes/colones.pipe';
import { LocalizacionService } from './localizacion.service';
import { GestionOrdenesService } from './gestion-ordenes.service';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
public localizationService: LocalizacionService,
public gestionOrdenesService: GestionOrdenesService,
public http: HttpClient

  ) { }

  getFormattedDate(date) {


    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return day + '/' + month + '/' + year;
}


generatePDF(proveedor:Proveedores, ordenCompra:OrdenCompra, articulos:any[]){

  this.http.get('../assets/icon/isa.png', { responseType: 'blob' })
  .subscribe(res => {
    const reader = new FileReader();
    reader.onloadend = () => {
      var base64data = reader.result;                
          console.log(base64data);
 
         this.rellenarpdf(base64data,proveedor, ordenCompra, articulos)
    }

    reader.readAsDataURL(res); 
    console.log(res);
  });

 
}


  async rellenarpdf(image,proveedor:Proveedores, ordenCompra:OrdenCompra, articulos:any[]){

    let i =  this.localizationService.continents.findIndex(pais => pais.PAIS == ordenCompra.PAIS);

    const pdf = new PdfMakeWrapper();
    pdf.pageMargins(20);

    pdf.info({
      title:ordenCompra.ORDEN_COMPRA,
      author: ordenCompra.USUARIO,
      subject: 'Orden de compra',
  });

    let data = [];


    let header = {
      layout: 'noBorders', // optional
      table: {
      headerRows: 1,
      widths: [ '*', 'auto', 100, '*' ],
      body: [
        [ { image: image,width: 100}, [

          { text: 'Distribuidora Isleña de Alimentos S.A.'},
          { text: '400 Mtr N. Embotelladora Pepsi'},
          { text: 'Barreal de Heredia'},
          { text: '22930609'}

        ], '', this.getFormattedDate(new Date(ordenCompra.FECHA_REQUERIDA)) ],
        [{ text: '', margin: [ 10, 10, 10, 10 ]} , '' , '' , '', ],
        [   { text: 'Proveedor: ', bold: true} , proveedor.NOMBRE , '' , '', ],
        [   { text: 'Teléfono:', bold: true} , proveedor.TELEFONO1 , 'Fax:' , proveedor.FAX, ],
        [   { text: 'Dirección:', bold: true} , proveedor.DIRECCION , '' , '', ],
        [   { text: 'País:', bold: true} , i >=0 ? this.localizationService.continents[i].NOMBRE : '' , '' , '', ],
        [   { text: 'Condición de Pago:', bold: true} ,proveedor.CONDICION_PAGO +'  días' , '' , '', ],
        [   { text: 'Moneda:', bold: true} , ordenCompra.MONEDA , '' , '', ],
        [   { text: 'Dirección de Embarque:', bold: true} , proveedor.DIRECCION , '' , '', ],
        [   { text:'Fecha de la Orden:', bold: true} , this.getFormattedDate(new Date(ordenCompra.FECHA_REQUERIDA)) , '' , '', ],
        [   { text: 'Fecha de Cotización:', bold: true} , this.getFormattedDate(new Date(ordenCompra.FECHA_REQUERIDA)) , '' , '', ],
        [   { text: 'Fecha Requerida:', bold: true} , this.getFormattedDate(new Date(ordenCompra.FECHA_REQUERIDA)) , '' , '', ],
    
        [     { text: 'Lista de Articulos',alignment: 'left',margin: [0, 10, 0, 10],bold: true}, '', '', '' ]
      ]
    }
    }

    let body = {
      layout: 'lightHorizontalLines', // optional
      table: {
      headerRows: 1,
      widths: [55, 115,60,60, 90,60 ],
      body: [
        ['','', 'Cantidad', 'Precio', 'Descuento','Importe'],
        ['Artículo','Descripción', 'Ordenada', 'Unitario', '%','Total']
      ]
    }
    }
    let montos = {
      layout: 'noBorders', // optional
      table: {
      headerRows: 1,
      widths: ['*', 'auto', '*', '*','*','*'],
      body: [
        ['','', '', '',  { text: 'Total: ', bold: true},''],
        ['','', '', '',  { text: 'Mercadería: ', bold: true},ColonesPipe.prototype.transform(ordenCompra.TOTAL_MERCADERIA, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)],
        ['','', '', '',  { text: 'Descuento: ', bold: true},ColonesPipe.prototype.transform(ordenCompra.MONTO_DESCUENTO, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)],
        ['','', '', '',  { text: 'Impuesto1: ', bold: true},ColonesPipe.prototype.transform(ordenCompra.TOTAL_IMPUESTO1, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)],
        ['','', '', '',  { text: 'Impuesto2: ', bold: true},ColonesPipe.prototype.transform(0, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)],
        ['','', '', '',  { text: 'SubTotal: ', bold: true},ColonesPipe.prototype.transform(0, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)],
        ['','', '', '',  { text: 'Flete: ', bold: true},ColonesPipe.prototype.transform(ordenCompra.MONTO_FLETE, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)],
        ['','', '', '',  { text: 'Seguro: ', bold: true},ColonesPipe.prototype.transform(ordenCompra.MONTO_SEGURO, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)],
        ['','', '', '',  { text: 'Documentación: ', bold: true},ColonesPipe.prototype.transform(ordenCompra.MONTO_DOCUMENTACIO, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)],
        ['','', '', '',  { text: 'Total: ', bold: true},ColonesPipe.prototype.transform(ordenCompra.TOTAL_A_COMPRAR, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)],
        ['','', '', '',  { text: 'Anticipo: ', bold: true},ColonesPipe.prototype.transform(ordenCompra.MONTO_ANTICIPO, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)],
        ['','', '', '',  { text: 'Saldo: ', bold: true},ColonesPipe.prototype.transform(0, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)],
        [{ text: 'Instrucciones: ', bold: true},'', '', '',  '',''],
        [{ text: ordenCompra.INSTRUCCIONES},'', '', '',  '',''],
      ]
    }
    }




    for(let a =0; a < articulos.length ; a++){

      body.table.body.push([ articulos[a].articulo.ARTICULO, {text: articulos[a].articulo.DESCRIPCION, alignment: 'left',fontSize: 10 } , articulos[a].articulo.CANTIDAD_ORDENADA , ColonesPipe.prototype.transform(articulos[a].articulo.PRECIO_UNITARIO, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda),ColonesPipe.prototype.transform(articulos[a].articulo.IMPUESTO1, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda) ,  ColonesPipe.prototype.transform(articulos[a].articulo.PRECIO_UNITARIO * articulos[a].articulo.CANTIDAD_ORDENADA, 2 , '.' , ',' ,  this.gestionOrdenesService.moneda)])
      if( a == articulos.length -1){

        pdf.add(
          [
          header,
          body,
          montos
        ]
      
        );
        pdf.create().download(ordenCompra.ORDEN_COMPRA);
    

      }
    }


    return



  }


}
