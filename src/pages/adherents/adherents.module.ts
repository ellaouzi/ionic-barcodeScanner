import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdherentsPage } from './adherents';

@NgModule({
  declarations: [
    AdherentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdherentsPage),
  ],
})
export class AdherentsPageModule {}
