import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { AdherentsPage } from '../pages/adherents/adherents';
import { AgentPage } from '../pages/agent/agent';
import { PrestationSuccessPage } from '../pages/prestation-success/prestation-success';
import { PrestationPage } from '../pages/prestation/prestation';
import { DataServiceProvider } from '../providers/data-service/data-service';

import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { PeopleServiceProvider } from '../providers/people-service/people-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    AdherentsPage,
    AgentPage,
    PrestationPage,
    PrestationSuccessPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    AdherentsPage,
    AgentPage,
    PrestationPage,
    PrestationSuccessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Toast,
    DataServiceProvider,
    PeopleServiceProvider
  ]
})
export class AppModule {}
