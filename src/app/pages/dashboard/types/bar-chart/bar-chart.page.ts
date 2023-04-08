import { Component, OnInit, HostListener, ChangeDetectorRef, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
 
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.page.html',
  styleUrls: ['./bar-chart.page.scss'],
})
export class BarChartPage implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  width:number;
  chartHeight  = '0px';
  constructor(
    public plt:Platform,
    public alertService:AlertService,
    public cd:ChangeDetectorRef,
  ) { }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DatalabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = null;

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

 
  ionViewWillEnter() {
    this.alertService.presentaLoading('Loading data...')
    this.barChartData = null;
    this.width = this.plt.width();
    this.toggleMenu()

let labels = [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ];
let datasets = [
  { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
  { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
]

setTimeout(()=>{
  this.alertService.loadingDissmiss();
  this.barChartData = {
    labels: labels ,
    datasets:  datasets
  };
  this.chart?.update();
},1000)

  }
  ngOnInit() {
  }
  toggleMenu(){
    if(this.width > 1400){
      this.chartHeight = '600px';
  
 
     } else if(this.width >= 768 && this.width <= 1366){
      this.chartHeight = '460px';
  
   
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
