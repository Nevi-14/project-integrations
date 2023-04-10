import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { CompaniesService } from './companies.service';
import { InvoiceLines } from '../models/invoice_lines';

@Injectable({
  providedIn: 'root'
})
export class InvoiceLinesService {
  invoices:InvoiceLines[]=[];
  invoice : InvoiceLines = {
    id:null,
    id_invoice:null,
    id_product:null,
    description:null,
    price:null,
    units:null,
    tax_id:null,
    tax_description:null,
    tax_amount:null,
    sub_total:null,
    total : null

  }
  constructor(
   private http: HttpClient,
   private alertService:AlertService,
   public companiesService:CompaniesService 
  ) { }

  getAPI(api){
    let test = '';
    if(environment.prdMode) test = environment.TestURL;
    const   URL =  environment.preURL + test + environment.postURL + api;
    return URL;
  }

  private getInvoicesLines(id:number){
    let URL = this.getAPI(environment.getInvoicesLinesAPI);
        URL = URL + id;
    console.log('URL', URL)
    return this.http.get<InvoiceLines[]>(URL);
  }
  
  private postInvoiceLine(invoiceLine:InvoiceLines){
    const URL = this.getAPI(environment.postInvoiceLineAPI);
    const options = {
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Access-Control':'*'
      }
    }
    return this.http.post(URL, invoiceLine, options);
  
  }
  
  
  private putInvoiceLine(invoiceLine:InvoiceLines){
    let URL = this.getAPI(environment.putInvoiceLineAPI);
        URL = URL + invoiceLine.id
    const options = {
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    console.log(URL)
    console.log(invoiceLine)
    return this.http.put(URL,invoiceLine,options);
  }
  
  private deleteInvoiceLine(id:number){
    let URL = this.getAPI(environment.deleteInvoiceLineAPI);
        URL = URL + id;
        const options = {
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
    return this.http.delete(URL,options);
  }
  
  
  syncGetInvoicesLinesToPromise(id:number){
   return  this.getInvoicesLines(id).toPromise();
  }
  
  syncPostInvoiceLineToPromise(invoiceLine:InvoiceLines){
    return this.postInvoiceLine(invoiceLine).toPromise();
  }
  syncPutInvoiceLineToPromise(invoiceLine:InvoiceLines){
    return this.putInvoiceLine(invoiceLine).toPromise();
  }
  
  syncDeleteInvoiceLineToPromise(id:number){
    return this.deleteInvoiceLine(id).toPromise();
  }
}
