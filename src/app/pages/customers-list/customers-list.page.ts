import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Customers } from 'src/app/models/customers';
import { AlertService } from 'src/app/services/alert.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.page.html',
  styleUrls: ['./customers-list.page.scss'],
})
export class CustomersListPage implements OnInit {


constructor(
 public alertService:AlertService,
 public companiesService:CompaniesService,
 public customerService:CustomersService,
 public modalCtrl:ModalController   
  ) { }

  ngOnInit() {
    this.alertService.presentaLoading('Loading data...')
    this.customerService.syncGetCustomersToPromise(this.companiesService.company.id).then(customers =>{
      this.alertService.loadingDissmiss();
      this.customerService.customers = customers;
    }, error =>{
      this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','Something went wrong')
    })
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }


selectCustomer(customer:Customers){
  this.customerService.customer = customer;
  this.closeModal();
}
}
