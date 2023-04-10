import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Products } from 'src/app/models/products';
import { AlertService } from 'src/app/services/alert.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {

  constructor(
    public modalCtrl:ModalController,
    public alertService:AlertService,
    public companiesService:CompaniesService,
    public productsService:ProductsService

  ) { }

  ngOnInit() {
    this.alertService.presentaLoading('Loading data..');
    this.productsService.syncGetProductsToPromise(this.companiesService.company.id).then(products =>{
      this.alertService.loadingDissmiss();
      this.productsService.products = products;
    }, error =>{
      this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding', 'Something Went Wrong!..')
    })
  }

  addProduct(product:Products){
    return this.modalCtrl.dismiss({
      product:product
    })
  }
  closeModal(){
    this.modalCtrl.dismiss();
  }
}
