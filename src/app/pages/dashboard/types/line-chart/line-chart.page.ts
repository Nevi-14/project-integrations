import { Component, OnInit, HostListener, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { ChartType, Plugin, Chart, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.page.html',
  styleUrls: ['./line-chart.page.scss'],
})
export class LineChartPage implements OnInit {
  public lineChartType: ChartType = 'line';
 
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  width:number;
  chartHeight  = '0px';
 
  constructor(
    public plt:Platform,
    public alertService:AlertService,
    public cd:ChangeDetectorRef,
  ) {


   }
 
 



  ionViewWillEnter() {
  
 
    this.width = this.plt.width();
    this.toggleMenu()
  }
  ngOnInit() {
  }
  toggleMenu(){
    if(this.width > 1400){
      this.chartHeight = '600px';
  
 
     } else if(this.width >= 768 && this.width <= 1366){
      this.chartHeight = '400px';
  
   
    }else{
    
       // this.menuCtrl.toggle('myMenu');
       this.chartHeight = '100%';

  
    }
 

    this.cd.detectChanges();
    this.cd.markForCheck();
   // this.router.navigateByUrl('/inicio/dashboard1', {replaceUrl:true})
    
  }



// CHECKS SCREEN RESIZE LIVE

@HostListener('window:resize',['$event'])

private onResize(event){

this.width = event.target.innerWidth;
this.toggleMenu();

}
}
