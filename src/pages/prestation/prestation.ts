import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
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
  public prestations;
  public attachedFields;

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
    gsm: "",
    prestation: ""
  };

  private prestationSuccessPage;
  private homePage;

  constructor(public http: HttpClient,
              public navCtrl: NavController,
              public peopleData: PeopleServiceProvider,
              public formBuilder: FormBuilder,
  ) {
    this.myForm = this.createMyForm();
    this.homePage = HomePage;
    this.prestationSuccessPage = PrestationSuccessPage;

    this.peopleData.getPrestations().subscribe(
      data => {
        this.prestations = data["_embedded"]["prestationrefs"]
      }
    );
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
    this.prestationDto.codAg = '2333';
    this.prestationDto.prestation = 'http://31.220.54.142:8080/univers-demande/prestations/29509';
    console.log(JSON.stringify(this.prestationDto));

    var REST_SERVICE_URI = 'http://31.220.54.142:8080/univers-demande/demandes';
    this.http.post(REST_SERVICE_URI, this.prestationDto)
      .subscribe(
        res => {
          console.log(res);
        }
        ,
        err => {
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

  goHome() {
    this.navCtrl.push(this.homePage);
  }
}
