import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the PersistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PersistProvider {

  constructor() {
    console.log('Hello PersistProvider Provider');
  }

  getItem(key: string): Observable<any> {
    const item = localStorage.getItem(key);
    return Observable.of(item);
  }
  setItem(key: string, value: any): Observable<any> {
    localStorage.setItem(key, value);
    return Observable.of(value);
  }
  removeItem(key: string): Observable<any> {
    const item = localStorage.getItem(key);
    localStorage.removeItem(key);
    return Observable.of(item);
  }

}
