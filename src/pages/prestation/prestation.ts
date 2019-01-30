import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import {PeopleServiceProvider} from "../../providers/people-service/people-service";
import { PrestationSuccessPage } from '../prestation-success/prestation-success';

@IonicPage()
@Component({
  selector: 'page-prestation',
  templateUrl: 'prestation.html',
})
export class PrestationPage {
  private prestationSuccessPage;

  public ppr:string="";
  public adherent:String="";
  myForm: FormGroup;
  /*prestationDto = {
    id : 0,
    nom : "1516775",
    benificiare : "",
    distination : "",
    choix1 : "",
    periode1 : "",
    codAg : ""
  };*/
  //prestationDto={id:null,codAg:'',choix1:'',choix2:'',periode1:'',periode2:'',email:'',benificiare:'',pprconj:'',gsm:'',statut:''};
  prestationDto={id:null,codAg:"",choix1:"",choix2:"",periode1:"",periode2:"",email:"",benificiare:"",pprconj:"",gsm:""};

  constructor(public http: Http,public navCtrl: NavController,public peopleData: PeopleServiceProvider, public navParams: NavParams,public formBuilder: FormBuilder, public loadingCtr: LoadingController) {
    this.myForm = this.createMyForm();
   this.ppr=navParams.data.ppr.text;

     //this.ppr='525552';
    this.prestationSuccessPage=PrestationSuccessPage;

     var pprScaned= this.ppr;
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

        this.prestationDto.choix1=this.myForm.value.choix1;
        this.prestationDto.periode1=this.myForm.value.periode1;
        this.prestationDto.benificiare=this.myForm.value.lastName;
        var json =JSON.stringify(this.prestationDto)
        console.log(json);
         var REST_SERVICE_URI = 'http://localhost:8080/';
         var REST_SERVICE_URI = 'http://31.220.54.142:8080/fosagri/relais/prestation/';

        const req = this.http.post(REST_SERVICE_URI ,  this.prestationDto)
          .subscribe(
            res => {console.log(res);},
            err => { console.log("Error occured");
            }
          );
        this.navCtrl.push(this.prestationSuccessPage);

      }

  private createMyForm() {
    return this.formBuilder.group({
      benificiare: ['', Validators.required],
      pprconj: ['', Validators.required],
      choix1: ['', Validators.required],
      choix2: ['', Validators.required],
      periode1: ['', Validators.required],
      periode2: ['', Validators.required],
      email: ['', Validators.required],
      gsmRetry: this.formBuilder.group({
        gsm: ['', Validators.required],
        gsmConfirmation: ['', Validators.required]
      }),
     });
  }
}
