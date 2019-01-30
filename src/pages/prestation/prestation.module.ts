import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrestationPage } from './prestation';

@NgModule({
  declarations: [
    PrestationPage,
  ],
  imports: [
    IonicPageModule.forChild(PrestationPage),
  ],
})
export class PrestationPageModule {}
