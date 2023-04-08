import { Component, OnInit, HostListener, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { ChartType, Plugin, Chart, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation'; // npm i chartjs-plugin-annotation
 
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

    Chart.register(Annotation)
   }
 
 
   public lineChartData: ChartConfiguration['data'] = {
     datasets: [
       {
         data: [ 65, 59, 80, 81, 56, 55, 40 ],
         label: 'Series A',
         backgroundColor: 'rgba(148,159,177,0.2)',
         borderColor: 'rgba(148,159,177,1)',
         pointBackgroundColor: 'rgba(148,159,177,1)',
         pointBorderColor: '#fff',
         pointHoverBackgroundColor: '#fff',
         pointHoverBorderColor: 'rgba(148,159,177,0.8)',
         fill: 'origin',
       },
       {
         data: [ 28, 48, 40, 19, 86, 27, 90 ],
         label: 'Series B',
         backgroundColor: 'rgba(77,83,96,0.2)',
         borderColor: 'rgba(77,83,96,1)',
         pointBackgroundColor: 'rgba(77,83,96,1)',
         pointBorderColor: '#fff',
         pointHoverBackgroundColor: '#fff',
         pointHoverBorderColor: 'rgba(77,83,96,1)',
         fill: 'origin',
       },
       {
         data: [ 180, 480, 770, 90, 1000, 270, 400 ],
         label: 'Series C',
         yAxisID: 'y1',
         backgroundColor: 'rgba(255,0,0,0.3)',
         borderColor: 'red',
         pointBackgroundColor: 'rgba(148,159,177,1)',
         pointBorderColor: '#fff',
         pointHoverBackgroundColor: '#fff',
         pointHoverBorderColor: 'rgba(148,159,177,0.8)',
         fill: 'origin',
       }
     ],
     labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
   };
 
   public lineChartOptions: ChartConfiguration['options'] = {
     elements: {
       line: {
         tension: 0.5
       }
     },
     scales: {
       // We use this empty structure as a placeholder for dynamic theming.
       y:
         {
           position: 'left',
         },
       y1: {
         position: 'right',
         grid: {
           color: 'rgba(255,0,0,0.3)',
         },
         ticks: {
           color: 'red'
         }
       }
     },
 
     plugins: {
       legend: { display: true },
       annotation: {
         annotations: [
           {
             type: 'line',
             scaleID: 'x',
             value: 'March',
             borderColor: 'orange',
             borderWidth: 2,
             label: {
               display: true,
               position: 'center',
               color: 'orange',
               content: 'LineAnno',
               font: {
                 weight: 'bold'
               }
             }
           },
         ],
       }
     }
   };
 


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
