import { Injectable } from '@angular/core';
import {Img, PageReference, PdfMakeWrapper, Table, TextReference, Txt} from 'pdfmake-wrapper';
import { OrdenCompra } from '../models/ordencompra';
import { Proveedores } from '../models/proveedores';
import { ColonesPipe } from '../pipes/colones.pipe';
import { LocalizacionService } from './localizacion.service';



@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
public localizationService: LocalizacionService

  ) { }

  getFormattedDate(date) {


    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return day + '/' + month + '/' + year;
}





  async generatePDF(proveedor:Proveedores, ordenCompra:OrdenCompra, articulos:any[]){

 let i =  this.localizationService.continents.findIndex(pais => pais.PAIS == ordenCompra.PAIS);


    let pdf1 = new PdfMakeWrapper();
    let header = null;
  
    pdf1.info({
      title:ordenCompra.ORDEN_COMPRA,
      author: ordenCompra.USUARIO,
      subject: 'Orden de compra',
  });




  const header1 = new Table([
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
        this.getFormattedDate(new Date(ordenCompra.FECHA_REQUERIDA))
    ]
  ]).widths([120, '*',100]).layout('noBorders').end;

  pdf1.pageSize({
    width: 595.28,
    height: 'auto'
  })

  pdf1.add(header1);
pdf1.add('\n');



// Encabezados del PDF...

const header2 = new Table([
  [
    'Proveedor:',proveedor.NOMBRE,''
  ],
  [
    'Teléfono:',proveedor.TELEFONO1,'Fax : ' + proveedor.FAX
  ],
  [
    'Dirección:',proveedor.DIRECCION,''
  ],
  [
    'País:', i >=0 ? this.localizationService.continents[i].NOMBRE : '',''
  ],
  [
    'Condición de Pago:',proveedor.CONDICION_PAGO +'  días',''
  ],
  [
    'Moneda:',proveedor.MONEDA,''
  ],
  [
    'Dirección de Embarque:',proveedor.DIRECCION,''
  ],
  [
    'Fecha de la Orden:',this.getFormattedDate(new Date(ordenCompra.FECHA_REQUERIDA)),''
  ],
  [
    'Fecha de Cotización:',this.getFormattedDate(new Date(ordenCompra.FECHA_REQUERIDA)),''
  ],
  [
    'Fecha Requerida:',this.getFormattedDate(new Date(ordenCompra.FECHA_REQUERIDA)),''
  ],
]).widths([100, '*','*']).margin(6).layout('noBorders').alignment('left').end;
pdf1.add(header2); 

let data = [['Artículo','Descripción', 'Ordenada', 'Unitario', '%','Total']];


for(let d =0; d < articulos.length; d++){

  data.push([ articulos[d].articulo.ARTICULO,  articulos[d].articulo.DESCRIPCION, articulos[d].articulo.CANTIDAD_ORDENADA , ColonesPipe.prototype.transform(articulos[d].articulo.PRECIO_UNITARIO),ColonesPipe.prototype.transform(articulos[d].articulo.IMPUESTO1) ,  ColonesPipe.prototype.transform(articulos[d].articulo.PRECIO_UNITARIO * articulos[d].articulo.CANTIDAD_ORDENADA)])
console.log('d',d,'bodyData.length', articulos.length , ' bodyData.length -1',  articulos.length -1)
  if(d == articulos.length -1){

    const body0 = new Table([
      [
        '','', 'Cantidad', 'Precio', 'Descuento','Importe'
      ],
    ]).widths([60, 120,60,60, 90,60]).margin(0).layout('lightHorizontalLines').alignment('left').end;
    const body1 = new Table(data).widths([60, 120,60,60, 90,60]).layout('lightHorizontalLines').alignment('left').end;
  
    pdf1.add([new Txt('Lista Articulos').margin(6).bold().end,body0,body1]);
  






    const body2 = new Table([
      [
        '','', '', '',new Txt('Total').alignment('left').bold().end, ''
      ],
      [
        '','', '', '',new Txt('Mercadería:').alignment('left').bold().end, ColonesPipe.prototype.transform(ordenCompra.TOTAL_MERCADERIA) 
      ],
      [
        '','', '', '',  new Txt('Descuento:').alignment('left').bold().end,ColonesPipe.prototype.transform(ordenCompra.MONTO_DESCUENTO) 
      ],
      [
        '','', '', '', new Txt('Impuesto1:').alignment('left').bold().end, ColonesPipe.prototype.transform(ordenCompra.TOTAL_IMPUESTO1) 
      ],
      [
        '','', '', '', new Txt('Impuesto2:').alignment('left').bold().end , ColonesPipe.prototype.transform(0)  
      ],
      [
        '','', '', '', new Txt('SubTotal:').alignment('left').bold().end , ColonesPipe.prototype.transform(0)  
      ],
      [
        '','', '', '', new Txt('Flete:').alignment('left').bold().end , ColonesPipe.prototype.transform(ordenCompra.MONTO_FLETE) 
      ],
      [
        '','', '', '', new Txt('Seguro:').alignment('left').bold().end , ColonesPipe.prototype.transform(ordenCompra.MONTO_SEGURO)
      ],
      [
        '','', '', '', new Txt('Documentación:').alignment('left').bold().end,ColonesPipe.prototype.transform(ordenCompra.MONTO_DOCUMENTACIO) 
      ],
      [
        '','', '', '',new Txt('Total:').alignment('left').bold().end , ColonesPipe.prototype.transform(ordenCompra.TOTAL_A_COMPRAR)
      ],
      [
        '','', '', '', new Txt('Anticipo:').alignment('left').bold().end , ColonesPipe.prototype.transform(ordenCompra.MONTO_ANTICIPO) 
      ],
      [
        '','', '', '',new Txt('Saldo:').alignment('left').bold().end , ColonesPipe.prototype.transform(0)  
      ],
    ]).widths([55, 115,60,60, 90,60]).layout('lightHorizontalLines').alignment('right').end;
    pdf1.add(body2
  );
    
    
    pdf1.add([new Txt('Instrucciones').bold().alignment('left').margin(6).end]);
    pdf1.add([new Txt('').alignment('left').margin(6).end]);
    pdf1.create().download(ordenCompra.ORDEN_COMPRA);

  }
}



  }
  async generateFormat() {
    let imageOne!: any;
    let imageTwo!: any;
    let ancho!: '85';
    let alto!: '54';

    const pdf = new PdfMakeWrapper();


    var dd = [
      { text: 'Page 1' },
      
      { table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ '*', 'auto', 100, '*' ],

        body: [
          [ 'First', 'Second', 'Third', 'The last one' ],
          [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
          [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
        ]
      }},
      { text: 'Cool thing', linkToDestination: 'cool', margin: [0, 20, 0, 0] },
      { text: 'But what I want to be able to do is to also somehow get the page number from that id, so it looks like (for example) this:', margin: [0, 20, 0, 0] },
      { text: 'See: Cool thing (page 2)', linkToDestination: 'cool', margin: [0, 20, 0, 0] },
      { text: '', pageBreak: 'after' },
      { text: 'Page 2' },
      { text: 'An item of interest', id: 'interest', margin: [0, 20, 0, 0] },
      { text: 'Something cool', id: 'cool', margin: [0, 20, 0, 0] },
      { text: '', pageBreak: 'after' },
      { text: 'Page 3' },
      { text: 'Link to an interesting thing', linkToDestination: 'interest', margin: [0, 20, 0, 0] },
    ]
    
     
    pdf.add(
      dd

    );
    pdf.create().download('test');
  }

}
