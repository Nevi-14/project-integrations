import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { Users } from '../models/users';
import { CompanyUsersView } from '../models/company_users_view';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: CompanyUsersView[] = [];
  user: Users = {
    id: null,
    active: null,
    lastname: null,
    name: null,
    email: null,
    password: null,
    description: null,
  }
  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }


  private getAPI(api) {
    let test = '';
    if (environment.prdMode) test = environment.TestURL;
    const URL = environment.preURL + test + environment.postURL + api;
    return URL;
  }

  private getUsers(id:number) {
    let URL = this.getAPI(environment.getUsersAPI);
        URL = URL + id;
    console.log('URL', URL)
    return this.http.get<CompanyUsersView[]>(URL);
  }

  private postUser(user: Users) {
    const URL = this.getAPI(environment.postUserAPI);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control': '*'
      }
    }
    return this.http.post(URL, user, options);

  }


  private putUser(user: Users) {
    let URL = this.getAPI(environment.putUserAPI);
    URL = URL + user.id
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    console.log(URL)
    console.log(user)
    return this.http.put(URL, user, options);
  }

  private deleteUser(id: number) {
    let URL = this.getAPI(environment.deleteUserAPI);
    URL = URL + id;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    return this.http.delete(URL, options);
  }


  syncGetUsersToPromise(id:number) {
    return this.getUsers(id).toPromise();
  }

  syncPostUserToPromise(user: Users) {
    return this.postUser(user).toPromise();
  }
  syncPutUserToPromise(user: Users) {
    return this.putUser(user).toPromise();
  }

  syncDeleteUserToPromise(id: number) {
    return this.deleteUser(id).toPromise();
  }


}
