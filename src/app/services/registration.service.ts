import { Injectable } from '@angular/core';
import { Companies } from '../models/companies';
import { Industries } from '../models/industries';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  userInformation:Users = {
     id:null,
     active:null,
     lastname:null,
     name:null,
     email:null,
     password:null,
     description:null,      
}
  companyInformation:Companies = {
     id :null,
     id_user:null,
     active:null,
     name:null,
     description:null  
  }
  companyIndustries:Industries[]=[];

  constructor() { }
}
