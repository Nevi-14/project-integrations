import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { CustomersService } from 'src/app/services/customers.service';
import { Customers } from '../../models/customers';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.page.html',
  styleUrls: ['./edit-customer.page.scss'],
})
export class EditCustomerPage implements OnInit {
  @Input() customer:Customers  
  constructor(
  public modalCtrl: ModalController,
  public alertService:AlertService,
  public customersService:CustomersService,
  public companiesService:CompaniesService 
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
  putCustomer(){
    this.alertService.presentaLoading('Updating customer, please wait...')
    this.customersService.syncPutCustomerToPromise(this.customer).then(async (resp) =>{
     await this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','The customer has been updated!');
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
