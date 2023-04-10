import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ModalController, AlertController } from '@ionic/angular';
import { AddUserPage } from '../add-user/add-user.page';
import { EditUserPage } from '../edit-user/edit-user.page';
import { AlertService } from 'src/app/services/alert.service';
import { Users } from 'src/app/models/users';
import { CompaniesService } from 'src/app/services/companies.service';
import { CompanyUsersView } from 'src/app/models/company_users_view';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
isModalOpen:boolean = false;
  constructor(
  public usersService: UsersService,
  public modalCtrl: ModalController,
  public alertCTrl:AlertController,
  public alertService:AlertService,
  public companiesService:CompaniesService  
  ) { }

  ngOnInit() {
    this.alertService.presentaLoading('Loading data...')
    this.usersService.syncGetUsersToPromise(this.companiesService.company.id).then(resp =>{
      this.alertService.loadingDissmiss();
      this.usersService.users = [];
      this.usersService.users =    resp.slice(0);
    }, error =>{
      this.alertService.loadingDissmiss();
      this.alertService.message('Dev-Coding','Ups something went wrong!..')
    })
  }


  async addUser(){
    if(!this.isModalOpen){
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component:AddUserPage,
        cssClass:'large-modal'
          });
        modal.present();
        const { data } = await modal.onWillDismiss();
        this.isModalOpen = false;
        if(data != undefined){
        
        }

    }

  }
  async editUser(user:CompanyUsersView){

    return
  
  }

  async deleteUser(user:CompanyUsersView){
  let alert = await this.alertCTrl.create({
    subHeader:'Dev-Coding',
    message:'Do you want to delete the account?',
    buttons:[

      {
        text:'cancel',
        role:'cancel',
        handler:  ()=>{
     console.log('cancel')
        }
      },
      {
        text:'continue',
        role:'confirm',
        handler: async ()=>{
          this.alertService.presentaLoading('Delting user...')
          await  this.usersService.syncDeleteUserToPromise(user.id).then(async (resp) =>{
           await   this.alertService.loadingDissmiss();
           this.alertService.presentaLoading('Loading data...')
           this.usersService.syncGetUsersToPromise(this.companiesService.company.id).then(async(resp) =>{
            await   this.alertService.loadingDissmiss();
            this.usersService.users = [];
            this.usersService.users =    resp.slice(0);
            this.alertService.message('Dev-Coding','the user has been deleted..')
           }, error =>{
            this.alertService.loadingDissmiss();
            this.alertService.message('Dev-Coding','Ups something went wrong!..')
          })
   
            }, error =>{
              this.alertService.loadingDissmiss();
              this.alertService.message('Dev-Coding','Ups something went wrong!..')
            })
        }
      },
    ]
  })

  alert.present();
  }

}
