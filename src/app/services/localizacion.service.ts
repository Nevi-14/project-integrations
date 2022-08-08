import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contientes } from '../models/continentes';
import { PaisesContientes } from '../models/paisescontientes';

@Injectable({
  providedIn: 'root'
})

export class LocalizacionService {
continents = [];
  constructor(public http: HttpClient) { }
  private getContinentes(){
    let URL = 'assets/json/continents.json';
    console.log('URL', URL)
    return this.http.get<Contientes[]>(URL)
  }
  private getPaisesContinentes(){
    let URL = 'assets/json/paisescontinentes.json';
    console.log('URL', URL)
    return this.http.get<PaisesContientes[]>(URL)
  }


  
  syncContinentesToPromise() {
 return this.getContinentes().toPromise();
  }

  syncPaisesContinentesToPromise() {
    return this.getPaisesContinentes().toPromise();
     }
   
}
