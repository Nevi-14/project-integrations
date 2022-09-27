import { Injectable } from '@angular/core';
import {Img, PdfMakeWrapper, Table, Txt} from 'pdfmake-wrapper';
import { OrdenCompra } from '../models/ordencompra';




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
      title:'title',
      author: 'author',
      subject: 'subject',
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



  

/**
 *   let headerArray = [];
  let headerContent =[]
  for(let i =0; i < header.length; i++){
    headerArray.push('*')
    headerContent.push(new Txt(header[i]).end)
    if(i == header.length -1){

      header2 =  new Table([
        headerContent
      
      ]).widths(headerArray).layout('noBorders').margin(4).end;

    }
  }

 */




// Encabezados del PDF...

pdf1.add([header0]);
pdf1.add([new Txt(title).bold().alignment('center').margin(4).end]);

pdf1.add([new Txt(title2).bold().alignment('left').margin(4).end]);

header.forEach(head =>{
  pdf1.add([new Txt(head).alignment('left').margin(4).end]);
})


let data = [['Artículo','Descripción', 'Ordenada', 'Unitario', '%','Total']];


for(let d =0; d < bodyData.length; d++){

  data.push([ bodyData[d].articulo.ARTICULO,  bodyData[d].articulo.DESCRIPCION, bodyData[d].articulo.CANTIDAD_ORDENADA , bodyData[d].articulo.PRECIO_UNITARIO,  bodyData[d].articulo.IMPUESTO1, bodyData[d].articulo.PRECIO_UNITARIO * bodyData[d].articulo.CANTIDAD_ORDENADA])
console.log('d',d,'bodyData.length', bodyData.length , ' bodyData.length -1',  bodyData.length -1)
  if(d == bodyData.length -1){

    const body0 = new Table([
      [
        '','', 'Cantidad', 'Precio', 'Descuento','Importe'
      ],
    ]).widths(['*','*','*','*','*','*']).margin(0).layout('noBorders').end;
    const body1 = new Table(data).widths(['*','*','*','*','*','*']).margin(4).layout('lightHorizontalLines').end;
    const body2 = new Table([
      [
        '','', '', '', 'Total Mercadería:',ordenCompra.TOTAL_MERCADERIA
      ],
      [
        '','', '', '', 'Descuento:',ordenCompra.MONTO_DESCUENTO
      ],
      [
        '','', '', '', 'Impuesto1:',ordenCompra.TOTAL_IMPUESTO1
      ],
      [
        '','', '', '', 'Impuesto2:','0.00'
      ],
      [
        '','', '', '', 'SubTotal:','0.00'
      ],
      [
        '','', '', '', 'Flete:',ordenCompra.MONTO_FLETE
      ],
      [
        '','', '', '', 'Seguro',ordenCompra.MONTO_SEGURO
      ],
      [
        '','', '', '', 'Documentación:',ordenCompra.MONTO_DOCUMENTACIO
      ],
      [
        '','', '', '', 'Total:','0.00'
      ],
      [
        '','', '', '', 'Anticipo:',ordenCompra.MONTO_ANTICIPO
      ],
      [
        '','', '', '', 'Saldo:','0.00',
      ],
    ]).widths(['*','*','*','*','*','*']).margin(0).layout('noBorders').end;
    pdf1.add([new Txt('Lista Articulos').margin(4).bold().end,body0,body1,body2]);
    
    
    pdf1.add([new Txt('Instrucciones').bold().alignment('left').margin(4).end]);
    pdf1.add([new Txt('').alignment('left').margin(4).end]);
    pdf1.create().download(name);

  }
}



  }


}
