import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the PrestationSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prestation-success',
  templateUrl: 'prestation-success.html',
})
export class PrestationSuccessPage {
  private homePage;

  constructor(public navCtrl: NavController) {
    this.homePage = HomePage;

  }
  goHome() {
    this.navCtrl.push(this.homePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestationSuccessPage');
  }

}
