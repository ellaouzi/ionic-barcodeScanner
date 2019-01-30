import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {PeopleServiceProvider} from '../../providers/people-service/people-service';


@IonicPage()
@Component({
  selector: 'page-agent',
  templateUrl: 'agent.html',
  providers: [PeopleServiceProvider]

})
export class AgentPage {
  public adherent:String="";
  public ppr:String="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public peopleData: PeopleServiceProvider, public loadingCtr: LoadingController) {
     this.ppr=navParams.data.ppr.text;
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgentPage');
  }

}
