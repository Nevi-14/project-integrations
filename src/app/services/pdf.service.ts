import { Injectable } from '@angular/core';
import {Img, PageReference, PdfMakeWrapper, Table, TextReference, Txt} from 'pdfmake-wrapper';
import { OrdenCompra } from '../models/ordencompra';
import { ColonesPipe } from '../pipes/colones.pipe';



@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  getFormattedDate(date) {


    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}





  async generatePDF(header:any[],name:string,date:Date,title,title2,bodyData:any[], ordenCompra:OrdenCompra){
    let pdf1 = new PdfMakeWrapper();
    let header2 = null;
  
    pdf1.info({
      title:ordenCompra.ORDEN_COMPRA,
      author: ordenCompra.USUARIO,
      subject: 'Orden de compra',
  });




  const header0 = new Table([
    [
        await new Img('../assets/icon/isa.png').fit(
            [100, 100]
        ).build(),
   [
  [new Txt('Distribuidora Isleña de Alimentos S.A.').end],
  [new Txt('400 Mtr N. Embotelladora Pepsi').end],
  [new Txt('Barreal de Heredia').end],
  [new Txt('22930609').end]
],
        this.getFormattedDate(date)
    ]
  ]).widths([120, '*',100]).layout('noBorders').end;





// Encabezados del PDF...

pdf1.add([header0]);
pdf1.add([new Txt(title).bold().alignment('center').margin(4).end]);

pdf1.add([new Txt(title2).bold().alignment('left').margin(4).end]);

header.forEach(head =>{
  pdf1.add([new Txt(head).alignment('left').margin(4).end]);
})


let data = [['Artículo','Descripción', 'Ordenada', 'Unitario', '%','Total']];


for(let d =0; d < bodyData.length; d++){

  data.push([ bodyData[d].articulo.ARTICULO,  bodyData[d].articulo.DESCRIPCION, bodyData[d].articulo.CANTIDAD_ORDENADA , ColonesPipe.prototype.transform(bodyData[d].articulo.PRECIO_UNITARIO),ColonesPipe.prototype.transform(bodyData[d].articulo.IMPUESTO1) ,  ColonesPipe.prototype.transform(bodyData[d].articulo.PRECIO_UNITARIO * bodyData[d].articulo.CANTIDAD_ORDENADA)])
console.log('d',d,'bodyData.length', bodyData.length , ' bodyData.length -1',  bodyData.length -1)
  if(d == bodyData.length -1){

    const body0 = new Table([
      [
        '','', 'Cantidad', 'Precio', 'Descuento','Importe'
      ],
    ]).widths([60, 120,60,60, 60,60]).margin(0).layout('lightHorizontalLines').alignment('left').end;
    const body1 = new Table(data).widths([60, 120,60,60, 60,60]).margin(4).layout('lightHorizontalLines').alignment('left').end;
  
    pdf1.add([new Txt('Lista Articulos').margin(4).bold().end,body0,body1]);
     
    const body2 = new Table([
      [
        '','', '', '', 'Total Mercadería:', ColonesPipe.prototype.transform(ordenCompra.TOTAL_MERCADERIA) 
      ],
      [
        '','', '', '', 'Descuento:',ColonesPipe.prototype.transform(ordenCompra.MONTO_DESCUENTO) 
      ],
      [
        '','', '', '', 'Impuesto1:', ColonesPipe.prototype.transform(ordenCompra.TOTAL_IMPUESTO1) 
      ],
      [
        '','', '', '', 'Impuesto2:', ColonesPipe.prototype.transform(0)  
      ],
      [
        '','', '', '', 'SubTotal:', ColonesPipe.prototype.transform(0)  
      ],
      [
        '','', '', '', 'Flete:', ColonesPipe.prototype.transform(ordenCompra.MONTO_FLETE) 
      ],
      [
        '','', '', '', 'Seguro', ColonesPipe.prototype.transform(ordenCompra.MONTO_SEGURO)
      ],
      [
        '','', '', '', 'Documentación:',ColonesPipe.prototype.transform(ordenCompra.MONTO_DOCUMENTACIO) 
      ],
      [
        '','', '', '', 'Total:', ColonesPipe.prototype.transform(ordenCompra.TOTAL_A_COMPRAR)
      ],
      [
        '','', '', '', 'Anticipo:', ColonesPipe.prototype.transform(ordenCompra.MONTO_ANTICIPO) 
      ],
      [
        '','', '', '', 'Saldo:', ColonesPipe.prototype.transform(0)  
      ],
    ]).widths([60, 120,60,60, 60,60]).margin(4).layout('lightHorizontalLines').alignment('left').end;
    pdf1.add(body2
  );
    
    
    pdf1.add([new Txt('Instrucciones').bold().alignment('left').margin(4).end]);
    pdf1.add([new Txt('').alignment('left').margin(4).end]);
    pdf1.create().download(name);

  }
}



  }


}
