import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
 import { Injectable } from '@angular/core';
 import 'rxjs/add/operator/map'

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  constructor(public http: Http) {
    console.log('Hello DataServiceProvider Provider');
  }
 
  getProducts(){
    return this.http.get('assets/data/products.json')
    .map(res => res.json())
  }

  
}
