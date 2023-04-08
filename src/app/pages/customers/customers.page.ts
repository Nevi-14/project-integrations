import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddCustomerPage } from '../add-customer/add-customer.page';
import { EditCustomerPage } from '../edit-customer/edit-customer.page';
import { CustomersService } from '../../services/customers.service';
import { AlertService } from 'src/app/services/alert.service';
import { Customers } from '../../models/customers';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
isModalOpen:boolean = false;

  constructor(
    public modalCtrl:ModalController,
    public alertCrl:AlertController,
    public customersService:CustomersService,
    public alertService:AlertService,
    public companiesService:CompaniesService

  ) { }
  ngOnInit() {
    this.alertService.presentaLoading('Loading data...')
    this.customersService.syncGetCustomersToPromise(this.companiesService.company.id).then(resp =>{
      this.alertService.loadingDissmiss();
      this.customersService.customers = resp;
    }, error =>{
      this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','Something went wrong!.')
    })
  }

async addCustomer(){
if(!this.isModalOpen){
  this.isModalOpen = true;
  let modal = await this.modalCtrl.create({
    component:AddCustomerPage,
    cssClass:'large-modal'
  })

  modal.present();
  const { data } = await modal.onWillDismiss();
  this.isModalOpen = false;
  if(data != undefined){

  }
}
}

async editCustomer(customer:Customers){
  if(!this.isModalOpen){
    this.isModalOpen = true;
    let modal = await this.modalCtrl.create({
      component:EditCustomerPage,
      cssClass:'large-modal',
      componentProps:{
        customer
      }
    })
  
    modal.present();
    const { data } = await modal.onWillDismiss();
    this.isModalOpen = false;
    if(data != undefined){
  
    }
  }
  }

  async deleteCustomer(customer:Customers){
  const alert = await this.alertCrl.create({
    subHeader:'Dev-Coding',
    message:'Do you want to delete the customer?',
    buttons:[
      {
        text:'cancelar',
        role:'cancel',
        handler:()=>{
          console.log('cancel')
        }
      },
      {
        text:'continue',
        role:'confirm',
        handler:async ()=>{
          this.alertService.presentaLoading('Delting customer...')
          await  this.customersService.syncDeleteCustomerToPromise(customer.id).then(async (resp) =>{
           await   this.alertService.loadingDissmiss();
           this.alertService.presentaLoading('Loading data...')
           this.customersService.syncGetCustomersToPromise(this.companiesService.company.id).then(async(resp) =>{
            await   this.alertService.loadingDissmiss();
            this.customersService.customers = [];
            this.customersService.customers =    resp.slice(0);
            this.alertService.message('Dev-Coding','the customer has been deleted..')
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
