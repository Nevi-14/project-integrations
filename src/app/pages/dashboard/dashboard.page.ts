import { Component, OnInit, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartData, ChartEvent, ChartType, ChartConfiguration } from 'chart.js';
import {BaseChartDirective, ThemeService } from 'ng2-charts'; // https://www.npmjs.com/package/ng2-charts + https://valor-software.com/ng2-charts/#PieChart  + https://www.npmjs.com/package/chartjs-plugin-datalabels
import { Platform } from '@ionic/angular';
 
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { AlertService } from '../../services/alert.service';
type Theme = 'light-theme' | 'dark-theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  width:number;
  chartHeight  = '0px';


  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
   pieChartData: ChartData<'pie', number[], string | string[]> = null;
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  constructor(
    public plt:Platform,
    public alertService:AlertService,
    public cd:ChangeDetectorRef,
    public settingsService: SettingsService,
    public router:Router
    

  ) { }
 
  ngOnInit() {
  
    this.alertService.presentaLoading('Cargando datos...')
    this.width = this.plt.width();
    this.toggleMenu()


    this.pieChartData =  {
      labels: [ 'Web Sales', 'Store Sales','Mail Sales' ],
      datasets: [ {
        data: [ 300, 500, 100 ]
      } ]
    }

  setTimeout(()=>{
this.alertService.loadingDissmiss();
  }, 2000)
   
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
  console.log(this.chart, 'ch')

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
