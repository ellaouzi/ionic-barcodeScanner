import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'
import {PeopleServiceProvider} from "../../providers/people-service/people-service";
import {PrestationSuccessPage} from '../prestation-success/prestation-success';
import {HomePage} from '../../pages/home/home';
import {DetailPage} from '../../pages/detail/detail';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-prestation',
  templateUrl: 'prestation.html',
})


export class PrestationPage {
  public ppr: string = "";
  public prestations;
  public attachedFields;
  public adherent: String = ""
  private homePage;
  private detailPage;
  private form;

  constructor(
    public navCtrl: NavController,
    public peopleData: PeopleServiceProvider,
  ) {
    this.homePage = HomePage;
    this.detailPage = DetailPage;

    this.peopleData.getPrestations().subscribe(
      data => {
        this.prestations = data["_embedded"]["prestationrefs"]
      }
    );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestationSuccessPage');
  }


  goHome() {
    this.navCtrl.push(this.homePage);
  }

  selectPresation(prestation) {
    this.peopleData.getPrestationFields(prestation['_links']['prestationFields']['href']).subscribe(
      data => {
        this.attachedFields = data['_embedded']['prestationfields'];
      },
      undefined,
      () => {
        console.log('*************************2');
        this.form= this.convertFieldsToFormGroup();
        console.log(this.form);
        this.navCtrl.push(this.detailPage, {form: this.form,attachedFields: this.attachedFields});
      }
    );


  }


  private convertFieldsToFormGroup() {
    let group: any = {};
    this.attachedFields.forEach(field => {
     // group[field.colonne] = field.required ? new FormControl(field.inputvalue || '', Validators.required)
    //    : new FormControl(field.inputvalue || '');
       group[field.colonne]= new FormControl('');

    });
    console.log(group);
    return new FormGroup(group);
  }

}
