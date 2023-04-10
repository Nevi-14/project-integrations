import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { CustomersService } from 'src/app/services/customers.service';
import { ProductsService } from 'src/app/services/products.service';
import { CustomersListPage } from '../customers-list/customers-list.page';
import { ProductsListPage } from '../products-list/products-list.page';
import { Products } from '../../models/products';
import { CalendarPopoverPage } from '../calendar-popover/calendar-popover.page';
import { CompaniesService } from 'src/app/services/companies.service';
import { Invoices } from 'src/app/models/invoices';
import { InvoiceLines } from 'src/app/models/invoice_lines';
import { UsersService } from 'src/app/services/users.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { InvoiceLinesService } from 'src/app/services/invoice-lines.service';
import { Router } from '@angular/router';
interface productsToAdd {
  id: number,
  total: number,
  subTotal: number,
  tax: number,
  product: Products

}

// https://www.npmjs.com/package/signature_pad // npm i signature_pad
@Component({
  selector: 'app-invoice-generator',
  templateUrl: './invoice-generator.page.html',
  styleUrls: ['./invoice-generator.page.scss'],
})

export class InvoiceGeneratorPage implements OnInit {
  isOpen: boolean = false;
  products: productsToAdd[] = []
  taxAmount: number = 0;
  formatoFecha = new Date().toJSON().slice(0, 10).replace(/[/]/g, '-') + 'T00:00:00';

  invoice: Invoices = {
    id: null,
    iD_COMPANY: null,
    iD_CUSTOMER: null,
    iD_USER: null,
    title: null,
    description: 'No Description',
    currency: '¢',
    status: 'P',
    date: new Date(),
    requireD_DATE: new Date(),
    quotatioN_DATE: new Date(),
    approvaL_DATE: new Date(),
    closE_DATE: new Date(),
    totaL_INVOICE_LINES: 0,
    sub_total: 0,
    total: 0,
    discount: 0,
    discounT_AMOUNT: 0,
    shppinG_AMOUNT: 0,
    instructions: 'No Instructions'

  }

  constructor(
    public alertService: AlertService,
    public modalCtrl: ModalController,
    public customersService: CustomersService,
    public productsService: ProductsService,
    public popOverCtrl: PopoverController,
    public companiesService: CompaniesService,
    public usersService: UsersService,
    public invoicesService: InvoicesService,
    public invoiceLinesService: InvoiceLinesService,
    public router: Router
  ) { }

  ngOnInit() {
    //console.log('this.canvas-1', this.canvas)
    this.customersService.customer = {
      id:null,
      id_company:this.companiesService.company.id,
      active:true,
      name:null,
      lastname:null,
      email:null,
      phone:null,
      description:null,
      address:null
    }
  }


  async customersList() {
    if (!this.isOpen) {
      this.isOpen = true;
      const modal = await this.modalCtrl.create({
        component: CustomersListPage,
        cssClass: 'large-modal'
      })

      modal.present();
      const { data } = await modal.onWillDismiss();
      this.isOpen = false;


    }

  }

  async productsList() {
    if (!this.isOpen) {
      this.isOpen = true;
      const modal = await this.modalCtrl.create({
        component: ProductsListPage,
        cssClass: 'large-modal'
      })

      modal.present();
      const { data } = await modal.onWillDismiss();
      this.isOpen = false;
      if (data != undefined) {
        console.log(data)
        data.product.units = 1;
        let i = this.products.findIndex(e => e.id == data.product.id);
        if (i >= 0) {
          this.alertService.message('Dev-Coding', 'The product already exists')
        } else {
          let product: productsToAdd = {
            id: data.product.id,
            total: 1,
            subTotal: 1 * data.product.price,
            tax: 0,
            product: data.product
          }
          this.products.push(product)
          this.updateTotal();
        }

      }

    }

  }

  increseUnits(product: productsToAdd, $event) {
    console.log($event)
    product.product.units = $event.detail.value;
    console.log(product, 'increasing units')
    product.total = product.product.units * product.product.price + product.tax;
    product.subTotal = product.product.units * product.product.price;

    this.updateTotal();
  }



  updateTotal() {
    this.invoice.total = 0;
    this.invoice.sub_total = 0;
    this.taxAmount = 0;
    this.products.forEach(prod => {
      this.taxAmount += prod.tax;
      this.invoice.sub_total += prod.subTotal;
      this.invoice.total += prod.total;
    })
  }

  async selectDate(value) {

    const popover = await this.popOverCtrl.create({
      component: CalendarPopoverPage,
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps: {
        fecha: value == 1 ? this.invoice.quotatioN_DATE.toISOString() : this.invoice.requireD_DATE.toISOString()
      }
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (data != undefined) {

      let fecha = new Date(data.fecha).toLocaleDateString('Es', {
        year: 'numeric',
        month: '2-digit',
        weekday: 'short',
        day: 'numeric',
      });

      if (value == 1) {
        this.invoice.quotatioN_DATE = new Date(data.fecha);
      } else {
        this.invoice.requireD_DATE = new Date(data.fecha);
      }

    }
  }


  generarPost() {
    this.invoice.iD_COMPANY = this.companiesService.company.id;
    this.invoice.iD_CUSTOMER = this.customersService.customer.id;
    this.invoice.iD_USER = this.usersService.user.id;


    const invoicesLines: InvoiceLines[] = [];
    this.products.forEach((product, index) => {

      let invoice_line: InvoiceLines = {
        id: null,
        iD_INVOICE: null,
        iD_PRODUCT: product.id,
        description: product.product.description,
        price: product.product.price,
        units: product.product.units,
        tax_id: 0,
        taX_DESCRIPTION: 'No description',
        taX_AMOUNT: 0,
        suB_TOTAL: product.subTotal,
        total: product.total

      }

      invoicesLines.push(invoice_line);

      if (index == this.products.length - 1) {
        this.invoice.totaL_INVOICE_LINES = invoicesLines.length;
        console.log('invoice', this.invoice)
        console.log('invoicesLines', invoicesLines)

        this.alertService.presentaLoading('Saving data....');
        this.invoicesService.syncPostInvoiceToPromise(this.invoice).then((invoice: Invoices) => {

          invoicesLines.forEach(async (line, index) => {
            line.iD_INVOICE = invoice.id;
            await this.invoiceLinesService.syncPostInvoiceLineToPromise(line).then(invoice => {


            }, error => {
              this.alertService.loadingDissmiss();
              this.alertService.message('Dev-Coding', 'Ups something went wrong!..')

            })

            if (index == invoicesLines.length - 1) {
              this.alertService.loadingDissmiss();
              this.router.navigateByUrl('/home/invoices', { replaceUrl: true })
              this.alertService.message('Dev-Coding', 'The invoice has been generated.')
            }
          })


        }, error => {
          this.alertService.loadingDissmiss();
          this.alertService.message('Dev-Coding', 'Ups something went wrong!..')
        })
      }


    })
  }

}
