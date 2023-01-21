import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  menu = false;
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



 async  getCurrentURL(){

let localStorageURL =  JSON.parse(localStorage.getItem('currenrURL'));

if(localStorageURL){

  this.title = this.title = localStorageURL.split('/')[2];
}
     
/**
 *       alert(localStorageURL)
if(!this.currentUrl){
  this.currentUrl = localStorageURL;
  this.router.navigateByUrl(this.currentUrl, {replaceUrl:true})
  alert(this.currentUrl)
  return

}
 */

this.setCurrentURLToLocalStorage();

  }

  setCurrentURLToLocalStorage(){
    localStorage.removeItem('currenrURL')

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
        
    
          this.currentUrl = this.router.url
          localStorage.setItem('currenrURL', JSON.stringify(this.currentUrl))
        this.title =   this.currentUrl.split('/')[2];
        }
      }
    );
    
  }
  





}
