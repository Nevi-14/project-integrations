import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddCustomerPage } from '../add-customer/add-customer.page';
import { EditProductPage } from '../edit-product/edit-product.page';
import { AddProductPage } from '../add-product/add-product.page';
import { ProductsService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/services/alert.service';
import { Products } from '../../models/products';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
isModalOpen:boolean = false;
  constructor(
  public modalCtrl:ModalController,
  public alertCtrl:AlertController,
  public productsService:ProductsService,
  public alertService:AlertService,
  public companiesService:CompaniesService  
  ) { }

  ngOnInit() {

    this.alertService.presentaLoading('Loading data...')
    this.productsService.syncGetProductsToPromise(this.companiesService.company.id).then(products =>{
      this.alertService.loadingDissmiss();
      this.productsService.products = products;
    }, error =>{
      this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','Something went wrong!.')
    })
  }

  async addProduct(){
if(!this.isModalOpen){
  this.isModalOpen = true;
  const modal = await this.modalCtrl.create({
    component:AddProductPage,
    cssClass:'large-modal'
   })
  
   modal.present();
  
   const { data } = await modal.onWillDismiss();
   this.isModalOpen = false;
   if( data != undefined){
    
   }
}

  }
  async editProduct(product:Products){
    if(!this.isModalOpen){
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component:EditProductPage,
        cssClass:'large-modal',
        componentProps:{
          product
        }
       })
      
       modal.present();
      
       const { data } = await modal.onWillDismiss();
       this.isModalOpen = false;
       if( data != undefined){
        
       }
    }
    
      }


      async deleteProduct(product:Products){
        const alert = await  this.alertCtrl.create({
          subHeader:'Dev-Coding',
          message:'Do you want to delete the product?',
          buttons:[
            {
              text:'cancel',
              role:'cancel',
              handler:()=>{
                console.log('cancel')
              }
            },
            {
              text:'continue',
              role:'confirm',
              handler:async()=>{
                this.alertService.presentaLoading('Delting product...')
                await  this.productsService.syncDeleteProductToPromise(product.id).then(async (resp) =>{
                 await   this.alertService.loadingDissmiss();
                 this.alertService.presentaLoading('Loading data...')
                 this.productsService.syncGetProductsToPromise(this.companiesService.company.id).then(async(resp) =>{
                  await   this.alertService.loadingDissmiss();
                  this.productsService.products = [];
                  this.productsService.products =    resp.slice(0);
                  this.alertService.message('Dev-Coding','the product has been deleted..')
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
          ]
        })

       alert.present();
      }
}
