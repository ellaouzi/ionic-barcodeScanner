import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  PeopleServiceProvider
} from '../../providers/people-service/people-service';
import {
  LoadingController
} from 'ionic-angular';
 

@IonicPage()
@Component({
  selector: 'page-adherents',
  templateUrl: 'adherents.html',
  providers: [PeopleServiceProvider]

})
export class AdherentsPage {
  private adherentsPage;

  public people = new Array();
  public user={};
  public adherents={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public peopleData: PeopleServiceProvider, public loadingCtr: LoadingController) {
    this.adherentsPage= AdherentsPage;
    let ppr= navParams.data.ppr;
    let loader = this.loadingCtr.create({
      content: 'Loading people'
    });
    loader.present();

   this.adherents= peopleData.getAdherentapi(ppr) ;

   console.log("=========================================") ;
   console.log(this.adherents) ;

    peopleData.getPeople().subscribe(people => {
      console.log('people', people);
      loader.dismiss();

      this.people = people;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdherentsPage');
  }

  loadDetail(person) {
    this.navCtrl.push(this.adherentsPage, {
      person: person
    });
  }
}
