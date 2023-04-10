import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InvoiceGeneratorPage } from '../invoice-generator/invoice-generator.page';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {
isOpen:boolean = false;
  constructor(
  public modalCtrl:ModalController,
  public router: Router,
  public alertService:AlertService,
  public companiesService:CompaniesService,
  public invoicesService:InvoicesService  
  ) { }

  ngOnInit() {
    this.alertService.presentaLoading('Loading data..');
    this.invoicesService.syncGetInvoicesToPromise(this.companiesService.company.id).then(invoices =>{
      this.alertService.loadingDissmiss();
      this.invoicesService.invoices = invoices;
    }, error =>{
      this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','Something went wrong!.')
    })
  }


  newInvoice(){
this.router.navigateByUrl('home/invoice-generator',{replaceUrl:true})

  }
}
