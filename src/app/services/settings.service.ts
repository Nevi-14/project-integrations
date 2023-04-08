import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  menu = false;
  language = "English";
  isLoading = false;
  loading: HTMLIonLoadingElement ;
  elementos =[]
  isPRD:boolean;
  currentUrl: string = null;
  chartHeight ='0px';
  title = null;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl:ModalController,
    public router: Router
  ) { }








}
