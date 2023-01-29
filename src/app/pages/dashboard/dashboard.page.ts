import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface Menutem {
  route:string,
  text:string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit{

  selectedRoute = "/home/dashboard/pie-chart";

  menu:Menutem[]=[
    {
      route:'/home/dashboard/pie-chart',
      text:'Pie Chart'
    },
    {
     route:'/home/dashboard/bar-chart',
     text:'Bar Chart'
   },
   {
     route:'/home/dashboard/line-chart',
     text:'Line Chart'
   }
   
   
   ]
  constructor(
 public router: Router   
  ){}
  ngOnInit() {
   
  }
  segmentChanged($event){

  this.router.navigateByUrl($event.detail.value)


  }

}
