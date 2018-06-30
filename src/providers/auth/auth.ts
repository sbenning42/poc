import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { PersistProvider } from '../persist/persist';
import { switchMap, tap } from 'rxjs/operators';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient, public persist: PersistProvider) {
    console.log('Hello AuthProvider Provider');
  }

  register(user): Observable<any> {
    return this.http.post('http://api.poc.loc/api/register', user);
  }

  authenticate(user): Observable<any> {
    return this.http.post('http://api.poc.loc/api/authenticate', user);
  }

  authenticatePersist(): Observable<any> {
    const credentials$ = this.persist.getItem('credentials');
    const tokenOrFalse = credentials => credentials ? this.authenticate(credentials) : Observable.of(false);
    return credentials$.pipe(switchMap(tokenOrFalse));
  }

}
