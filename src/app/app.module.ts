import { NgModule,/** ADD THIS -> **/ CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from 'angular-calendar/date-adapters/date-adapter';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// set font to PDF
export function HttpLoaderFactory(httpClient:HttpClient){
  return new TranslateHttpLoader(httpClient, "../assets/i18n/", ".json");
}
PdfMakeWrapper.setFonts(pdfFonts);
@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      HttpClientModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        loader:{
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps:[HttpClient]

        }
      }),
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
      
    
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
      /** ADD THIS -> **/ schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {}
