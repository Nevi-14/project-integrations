import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InvoiceGeneratorPage } from '../invoice-generator/invoice-generator.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {
isOpen:boolean = false;
  constructor(
  public modalCtrl:ModalController,
  public router: Router  
  ) { }

  ngOnInit() {
  }


  newInvoice(){
this.router.navigateByUrl('home/invoice-generator',{replaceUrl:true})

  }
}
