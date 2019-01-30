import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
 import { Injectable } from '@angular/core';
 import 'rxjs/add/operator/map'

/*
  Generated class for the PeopleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeopleServiceProvider {
  url="";
  adInfo={};

  private adherent:String="";
  constructor(public http: Http) {
    console.log('Hello AgentsDataProvider Provider');
  }


  getAdherentapi(ppr){
  //  return this.http.get('http://localhost:8080/agent/getbyppr?ppr='+ppr)
   //OK return this.http.get('http://192.168.100.19:8080/agent/getbyppr?ppr=1516775')
//
// return this.http.get('http://192.168.43.56:8080/agent/getbyppr?ppr='+ppr)
 return this.http.get('http://31.220.54.142:8080/fosagri/adherentByPPR/ppr='+ppr)
   .map(res => res.json())
    .map(res => res)





  }
  getPeople(){

    // Creation de l'url en ajoutant l'id a la fin de l'url
this.url = 'http://localhost:8080/adherentByPPR/ppr:xx1516775';

// Effectue la requete
this.http.get('http://31.220.54.142:8080/agent/get?page=10&size=5').map(res => res.json()).subscribe(
         data => {
            console.log(data);
         },
         err => {
          console.log("Oops!");
         }
);

 //this.http.get('http://localhost:8080/agent/getbyppr?ppr=1516775').map(res => res.json()).subscribe(
  this.http.get('http://31.220.54.142:8080/fosagri/adherentByPPR/ppr=1518131').map(res => res.json()).subscribe(

 data => {
            console.log(data);
         },
         err => {
          console.log("Oops!");
         }
);

    return this.http.get('https://randomuser.me/api/?results=10')
      .map(res => res.json())
      .map(res => res.results)

  }

}
