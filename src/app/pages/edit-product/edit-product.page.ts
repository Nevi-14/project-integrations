import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Products } from 'src/app/models/products';
import { AlertService } from 'src/app/services/alert.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
 @Input() product:Products 

   constructor(
    public modalCtrl:ModalController,
    public productsService:ProductsService,
    public alertService:AlertService,
    public companiesService:CompaniesService  
     ) { }
   
     ngOnInit() {
     }
     closeModal(){
       this.modalCtrl.dismiss();
     }
   
     putProduct(){
       this.alertService.presentaLoading('Updating product, please wait...')
       this.productsService.syncPutProductToPromise(this.product).then(async (resp) =>{
        await this.alertService.loadingDissmiss();
         this.alertService.message('Dev-Coding','The product has been updated!');
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
