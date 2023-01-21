import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { format } from 'date-fns';


@Component({
  selector: 'app-calendar-popover',
  templateUrl: './calendar-popover.page.html',
  styleUrls: ['./calendar-popover.page.scss'],
})
export class CalendarPopoverPage implements OnInit {
  @Input() fecha: Date;

 max = new Date().getFullYear() +3
  constructor(
    public popOverCtrl: PopoverController,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
   
 

  }
 async formatDate(value: any) {

    const popover = await this.popOverCtrl.getTop();
    if (popover){
      return this.popOverCtrl.dismiss({
        fecha:value
      })

    }
     
   
  }
}
