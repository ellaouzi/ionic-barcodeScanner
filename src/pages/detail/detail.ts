import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PeopleServiceProvider} from "../../providers/people-service/people-service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PrestationSuccessPage} from "../prestation-success/prestation-success";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public url;
  myForm: FormGroup;

  private prestationSuccessPage;
  private profileForm;
  private form;
  private attachedFields;

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


  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public peopleData: PeopleServiceProvider,
              public formBuilder: FormBuilder,
              public navParams: NavParams) {

    this.profileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl('')
      })
    });


    this.prestationSuccessPage = PrestationSuccessPage;
    this.myForm = this.createMyForm();
    this.form = navParams.data.form;
    this.attachedFields=navParams.data.attachedFields;




    console.log('************************Form');

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


  private createMyForm() {
    return this.formBuilder.group({
      nomobre: ['', Validators.required],
      pprconj: ['', Validators.required],
      choix1: ['', Validators.required],
      choix2: ['', Validators.required],
      periode1: ['', Validators.required],
      periode2: ['', Validators.required],
      email: ['', Validators.required],
      gsm: ['', Validators.required],
    });
  }
}
