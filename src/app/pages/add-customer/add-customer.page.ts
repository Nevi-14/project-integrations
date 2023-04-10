import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { CustomersService } from 'src/app/services/customers.service';
import { Customers } from '../../models/customers';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.page.html',
  styleUrls: ['./add-customer.page.scss'],
})
export class AddCustomerPage implements OnInit {
  customer:Customers = {
    id:null,
    id_company:null,
    active:true,
    name:null,
    lastname:null,
    email:null,
    phone:null,
    description:null,
    address:null
  }
  constructor(
  public modalCtrl: ModalController,
  public alertService:AlertService,
  public customersService:CustomersService,
  public companiesService:CompaniesService  
  ) { }

  ngOnInit() {
    this.customer.id_company = this.companiesService.company.id;
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
  postCustomer(){
    this.alertService.presentaLoading('Adding customer, please wait...')
    console.log(this.customer, 'this.customer')
    this.customersService.syncPostCustomerToPromise(this.customer).then(async (resp) =>{
     await this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','The customer has been created!');
      this.alertService.presentaLoading('Loading data...')
      await  this.customersService.syncGetCustomersToPromise(this.companiesService.company.id).then(async (resp) =>{
        await this.alertService.loadingDissmiss();
        this.customersService.customers = [];
        this.customersService.customers =    resp.slice(0);
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
