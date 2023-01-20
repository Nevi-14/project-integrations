import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  image = '../assets/imgs/devCodingLogo.svg';
  public appPages = [
    { title: 'Inicio', url: '/inicio/detalle', icon: 'home' },
    { title: 'Dashboard', url: '/inicio/dashboard', icon: 'analytics' },
    { title: 'Control Viáticos', url: '/inicio/control-viaticos', icon: 'cash' }
   
  ];
  constructor() { }

  ngOnInit() {
  }

}
