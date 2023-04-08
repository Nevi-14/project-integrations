import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { CustomersService } from 'src/app/services/customers.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-invoice-generator',
  templateUrl: './invoice-generator.page.html',
  styleUrls: ['./invoice-generator.page.scss'],
})
export class InvoiceGeneratorPage implements OnInit {

  constructor(
    public alertService:AlertService,
    public modalCtrl:ModalController,
    public customersService:CustomersService,
    public productsService:ProductsService
  ) { }

  ngOnInit() {
  }

}
