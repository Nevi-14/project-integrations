import { Component, OnInit, Input } from '@angular/core';
import { Invoices } from 'src/app/models/invoices';
import { Products } from 'src/app/models/products';
import { CustomersService } from 'src/app/services/customers.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { CalendarPopoverPage } from '../calendar-popover/calendar-popover.page';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { CustomersListPage } from '../customers-list/customers-list.page';
import { ProductsListPage } from '../products-list/products-list.page';
import { InvoiceLinesService } from 'src/app/services/invoice-lines.service';
interface productsToAdd {
  id: number,
  total: number,
  subTotal: number,
  tax: number,
  product: Products

}
@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.page.html',
  styleUrls: ['./edit-invoice.page.scss'],
})
export class EditInvoicePage implements OnInit {
  isOpen: boolean = false;
  formatoFecha = new Date().toJSON().slice(0, 10).replace(/[/]/g, '-') + 'T00:00:00';

 
  constructor(
public customersService:CustomersService,
public invoicesService:InvoicesService,
public popOverCtrl: PopoverController,
public alertService: AlertService,
public modalCtrl:ModalController,
public invoicesLinesService:InvoiceLinesService

  ) { }

  ngOnInit() {
    console.log(this.invoicesLinesService.products, this.invoicesLinesService.products.length, 'products')
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
        let i = this.invoicesLinesService.products.findIndex(e => e.id == data.product.id);
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
          this.invoicesLinesService.products.push(product)
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
    this.invoicesService.invoice.total = 0;
    this.invoicesService.invoice.sub_total = 0;
    this.invoicesLinesService.taxAmount = 0;
    this.invoicesLinesService.products.forEach(prod => {
      this.invoicesLinesService.taxAmount += prod.tax;
      this.invoicesService.invoice.sub_total += prod.subTotal;
      this.invoicesService.invoice.total += prod.total;
    })
  }

  async selectDate(value) {

    const popover = await this.popOverCtrl.create({
      component: CalendarPopoverPage,
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps: {
        fecha: value == 1 ? this.invoicesService.invoice.quotatioN_DATE.toISOString() : this.invoicesService.invoice.requireD_DATE.toISOString()
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
        this.invoicesService.invoice.quotatioN_DATE = new Date(data.fecha);
      } else {
        this.invoicesService.invoice.requireD_DATE = new Date(data.fecha);
      }

    }
  }

  generarPost(){
    
  }
}
