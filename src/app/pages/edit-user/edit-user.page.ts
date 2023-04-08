import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/services/alert.service';
import { Users } from '../../models/users';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
@Input() user:Users
  constructor(
  public modalCtrl:ModalController,
  public alertService: AlertService,
  public usersService: UsersService,
  public companiesService:CompaniesService  
  ) { }

  ngOnInit() {
  }


  closeModal(){
this.modalCtrl.dismiss();
    
  }


  putUser(){
    this.alertService.presentaLoading('Updating user, please wait...')
    this.usersService.syncPutUserToPromise(this.user).then(async (resp) =>{
     await this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','The user has been updated!');
      this.alertService.presentaLoading('Loading data...')
      await  this.usersService.syncGetUsersToPromise(this.companiesService.company.id).then(async (resp) =>{
        await this.alertService.loadingDissmiss();
        this.usersService.users = [];
        this.usersService.users =    resp.slice(0);
        this.closeModal();
      }, error =>{
        this.alertService.loadingDissmiss();
        this.alertService.message('Dev-Coding','Ups something went wrong!..')
      })
    
    }, error =>{
      this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','Ups something went wrong!..')
    })
  }
}
