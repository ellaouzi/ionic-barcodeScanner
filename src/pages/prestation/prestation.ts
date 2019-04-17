import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import {PeopleServiceProvider} from "../../providers/people-service/people-service";
import {PrestationSuccessPage} from '../prestation-success/prestation-success';
import {HomePage} from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-prestation',
  templateUrl: 'prestation.html',
})
export class PrestationPage {
  public ppr: string = "";
  public adherent: String = "";
  myForm: FormGroup;
  prestationDto = {
    id: 0,
    codAg: "",
    choix1: "",
    choix2: "",
    periode1: "",
    periode2: "",
    email: "",
    nombre: 1,
    pprconj: "0",
    gsm: ""
  };

  private prestationSuccessPage;
  private homePage;

  constructor(public http: Http, public navCtrl: NavController, public peopleData: PeopleServiceProvider, public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtr: LoadingController) {
    this.myForm = this.createMyForm();
    this.homePage = HomePage;
    this.prestationSuccessPage = PrestationSuccessPage;
    //this.ppr='525552';

    this.ppr = navParams.data.ppr.text;

    var pprScaned = this.ppr;
    var numb = pprScaned.match(/\d/g);
    this.ppr = numb.join("");
    peopleData.getAdherentapi(this.ppr).subscribe(adherent => {
      let loader = this.loadingCtr.create({
        content: 'Loading people'
      });
      loader.present();
      console.log('adherent', adherent);
      this.adherent = adherent;
      loader.dismiss();
    });


    this.prestationDto.codAg = this.ppr;

  }


  saveData() {
    console.log(this.myForm.value);

    this.prestationDto.choix1 = this.myForm.value.choix1;
    this.prestationDto.periode1 = this.myForm.value.periode1;
    this.prestationDto.choix2 = this.myForm.value.choix2;
    this.prestationDto.periode2 = this.myForm.value.periode2;
    this.prestationDto.nombre = this.myForm.value.nombre;
    this.prestationDto.pprconj = this.myForm.value.pprconj;
    this.prestationDto.email = this.myForm.value.email;
    this.prestationDto.gsm = this.myForm.value.gsm;
    var json = JSON.stringify(this.prestationDto)
    console.log(json);
     var REST_SERVICE_URI = 'http://31.220.54.142:8080/fosagri/relais/prestation/';

    const req = this.http.post(REST_SERVICE_URI, this.prestationDto)
      .subscribe(
        res =>
        {
          console.log(res);
        }
        ,
        err =>
        {
          console.log("Error occured");
        }
      );
    this.navCtrl.push(this.prestationSuccessPage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestationSuccessPage');
  }

  private createMyForm() {
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      pprconj: ['', Validators.required],
      choix1: ['', Validators.required],
      choix2: ['', Validators.required],
      periode1: ['', Validators.required],
      periode2: ['', Validators.required],
      email: ['', Validators.required],
      gsm: ['', Validators.required],
    });
  }

  private go_Home() {
    this.navCtrl.push(this.homePage);
  }
}
