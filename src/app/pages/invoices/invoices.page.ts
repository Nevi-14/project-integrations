import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InvoiceGeneratorPage } from '../invoice-generator/invoice-generator.page';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { CompanyInvoicesView } from 'src/app/models/company_invoices_view';
import { CustomersService } from 'src/app/services/customers.service';
import { Products } from 'src/app/models/products';
import { InvoiceLinesService } from 'src/app/services/invoice-lines.service';
import { ProductsService } from 'src/app/services/products.service';
interface productsToAdd {
  id: number,
  total: number,
  subTotal: number,
  tax: number,
  product: Products

}
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {
isOpen:boolean = false;
  constructor(
  public modalCtrl:ModalController,
  public router: Router,
  public alertService:AlertService,
  public companiesService:CompaniesService,
  public invoicesService:InvoicesService,
  public customersService:CustomersService,
  public invoicesLinesService:InvoiceLinesService,
  public productsService:ProductsService  
  ) { }

  ngOnInit() {
    this.alertService.presentaLoading('Loading data..');
    this.invoicesService.syncGetInvoicesToPromise(this.companiesService.company.id).then(invoices =>{
      this.alertService.loadingDissmiss();
      this.invoicesService.invoices = invoices;
    }, error =>{
      this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','Something went wrong!.')
    })
  }


  newInvoice(){
this.router.navigateByUrl('home/invoice-generator',{replaceUrl:true})

  }

  editInvoice(invoice:CompanyInvoicesView){
console.log(invoice)
this.alertService.presentaLoading('Loading data please wait..');
   this.customersService.syncGetCustomersByIDToPromise(invoice.iD_CUSTOMER).then(customer =>{
    this.customersService.customer = customer[0];
  this.invoicesService.syncGetInvoicesByIDToPromise(invoice.iD_INVOICE).then(invoice =>{
    this.invoicesService.invoice = invoice[0];
this.invoicesLinesService.syncGetInvoicesLinesByIDToPromise(invoice[0].id).then(async (lines) =>{
 
  let products:Products[] =  await this.productsService.syncGetProductsToPromise(this.companiesService.company.id);
  console.log('products', products);
  this.invoicesLinesService.products = [];
  lines.forEach((line, index) =>{
    let i  = products.findIndex(p => p.id == line.iD_PRODUCT);
    let product: productsToAdd = {
      id: line.id,
      total: line.units,
      subTotal: line.suB_TOTAL,
      tax: line.taX_AMOUNT,
      product: i >=0 ?  products[i] : null
    }
    console.log('i', i)
    console.log('product', product)
if(i >=0){
  this.invoicesLinesService.products.push(product)
}

if(index == lines.length -1){
 
  console.log('this.invoicesLinesService.products', this.invoicesLinesService.products)
  this.alertService.loadingDissmiss();
  this.router.navigateByUrl('home/edit-invoice', {replaceUrl:true})
}
  })

}, error =>{
  this.alertService.loadingDissmiss();
  this.alertService.message('Dev-Coding','Something went wrong!...')
})
  }, error =>{
    this.alertService.loadingDissmiss();
    this.alertService.message('Dev-Coding','Something went wrong!...')
  })
  }, error =>{
    this.alertService.loadingDissmiss();
    this.alertService.message('Dev-Coding','Something went wrong!...')
  })

  }
}
