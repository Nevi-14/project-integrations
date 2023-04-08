import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from '../../models/products';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  product:Products = {
    id:null,
    id_company:null,
    name:null,
    image:null,
    units:0,
    price:null,
    description:null,
   }

   constructor(
    public modalCtrl:ModalController,
    public productsService:ProductsService,
    public alertService:AlertService,
    public companiesService: CompaniesService  
     ) { }
   
     ngOnInit() {
      this.product.id_company = this.companiesService.company.id;
     }
     closeModal(){
       this.modalCtrl.dismiss();
     }
   
     postProduct(){
       this.alertService.presentaLoading('Adding product, please wait...')
       this.productsService.syncPostProductToPromise(this.product).then(async (resp) =>{
        await this.alertService.loadingDissmiss();
         this.alertService.message('Dev-Coding','The product has been created!');
         this.alertService.presentaLoading('Loading data...')
         await  this.productsService.syncGetProductsToPromise(this.companiesService.company.id).then(async (resp) =>{
           await this.alertService.loadingDissmiss();
           this.productsService.products = [];
           this.productsService.products =    resp.slice(0);
           this.closeModal();
         }, error =>{
           this.alertService.loadingDissmiss();
           this.alertService.message('Dev-Coding','Ups something went wrong!..')
         })
       
       }, error =>{
         this.alertService.loadingDissmiss();
         this.alertService.message('Dev-Coding','Ups something went wrong!..')
       })
     }
}
