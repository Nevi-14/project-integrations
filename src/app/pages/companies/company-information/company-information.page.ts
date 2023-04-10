import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.page.html',
  styleUrls: ['./company-information.page.scss'],
})
export class CompanyInformationPage implements OnInit {

  constructor(
    public registrationService: RegistrationService
  ) { }

  ngOnInit() {
  }

}
