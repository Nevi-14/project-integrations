import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  image = '../assets/islena.png';
  showPass = false;
  constructor(public route: Router) { }

  ngOnInit() {
  }
  loginMethod(){
    this.route.navigate(['/inicio']);
  }

}
