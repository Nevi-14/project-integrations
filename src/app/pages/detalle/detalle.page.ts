import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  image = '../assets/islena.png';
  public appPages = [
    { title: 'Ordenes de Compra', url: '/inicio/gestion-ordernes', icon: 'reader' },
    { title: 'Compras en Linea', url: '/inicio/dashboard-compras-en-linea', icon: 'storefront' },
   
  ];
  constructor() { }

  ngOnInit() {
  }

}
