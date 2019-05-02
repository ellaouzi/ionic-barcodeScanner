import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import {environment} from "../../../ng-configuration/src/environments/environment";


@Injectable()
export class PeopleServiceProvider {
  url = "";

  constructor(public http: HttpClient) {
  }

  getPrestations() {
     return this.http.get(environment.PLATFORM_URL + '/prestationrefs');
  }

  getPrestationFields(url) {
    console.log('------------------');
    console.log(url);
    console.log('------------------');
    return this.http.get(url);
  }

}
