import { Component, Input, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent implements OnInit {
@Input()titulo;
fecha = new Date().toLocaleDateString();
  constructor(
    public menuCtrl: MenuController,
    private plt:Platform
    
      ) {}

  ngOnInit() {}
  toggle(){
 //   this.class = true;
    this.menuCtrl.toggle('myMenu');
  
  }
}
