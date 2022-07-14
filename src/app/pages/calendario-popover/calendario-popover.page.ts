import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-calendario-popover',
  templateUrl: './calendario-popover.page.html',
  styleUrls: ['./calendario-popover.page.scss'],
})
export class CalendarioPopoverPage implements OnInit {
  @Input() fecha: Date;

  constructor(
    public popOverCtrl: PopoverController,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
console.log('test', this.fecha)

  }
 async formatDate(value: string) {

    const popover = await this.popOverCtrl.getTop();
    if (popover){
      return this.popOverCtrl.dismiss({
        fecha:value
      })

    }
     
   
  }
}
