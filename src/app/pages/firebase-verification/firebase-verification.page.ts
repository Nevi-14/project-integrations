import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firebase-verification',
  templateUrl: './firebase-verification.page.html',
  styleUrls: ['./firebase-verification.page.scss'],
})
export class FirebaseVerificationPage implements OnInit {

  constructor(
    public router: Router,
public modalCtrl: ModalController

  ) { }

  ngOnInit() {
  }


  cerrarModal(){
this.modalCtrl.dismiss();
this.router.navigateByUrl('/home', {replaceUrl:true})

  }
}
