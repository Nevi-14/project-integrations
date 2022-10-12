import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';
interface email {
  toEmail:string,
  subject:string,
  body:string
}
@Injectable({
  providedIn: 'root'
})
export class EmailService {


  constructor(
    public http: HttpClient,
    public alertasService: AlertasService
  ) { }

  getURL(api){

    let test : string = '';
    
    if(!environment.prdMode){
    
    test = environment.TestURL;
    
    }
    
    const URL = environment.preURL2 + test + environment.postURL + api;
    
    return URL;
      
    }
private postEmailApi (email:email){
  const URL =  this.getURL(environment.emailApi);
  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
  };
 console.log('URL post lineas: ', URL);
 console.log('JSON Lineas:', JSON.stringify(email));
  return this.http.post( URL, JSON.stringify(email), options );
}

syncPostEmailToPromise(email:email){

return this.postEmailApi(email).toPromise();
  
}






}
