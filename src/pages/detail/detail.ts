import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {PrestationSuccessPage} from "../prestation-success/prestation-success";


@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  private prestationSuccessPage;
  private form;
  private attachedFields;

  constructor(  public navParams: NavParams) {
    this.prestationSuccessPage = PrestationSuccessPage;
    this.form = navParams.data.form;
    this.attachedFields = navParams.data.attachedFields;
  }


}
