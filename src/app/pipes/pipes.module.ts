import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { CurrencyPipe } from './currency.pipe';
 

@NgModule({
  declarations: [
    FiltroPipe,
    CurrencyPipe
  
  ],
  exports:[
    FiltroPipe,
    DatePipe,
    CurrencyPipe
  ],
  imports: [
    CommonModule
  ]

})
export class PipesModule { }
