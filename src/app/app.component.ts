import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { concat, switchMap, tap } from 'rxjs/operators';

import { Environ as E } from '../providers/environ/environ';
import { PersistProvider } from '../providers/persist/persist';
import { AuthProvider } from '../providers/auth/auth';
import { SiginInOrSignUpPage } from '../pages/sigin-in-or-sign-up/sigin-in-or-sign-up';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;
  loaded:boolean = false;

  firstPage$ = this.auth.authenticatePersist().pipe(
    switchMap(TabsPageOrSiginInOrSignUpPage),
    tap(page => this.setRootPage(page))
  );

  constructor(
    private persist: PersistProvider,
    private auth: AuthProvider,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.appLoad();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  setRootPage(page) {
    this.rootPage = page;
  }

  appLoad() {
    E.log('OKKK');
    this.firstPage$.subscribe(page => {
      this.loaded = true;
      E.log('page: ', this.rootPage);
    });
  }

}

function TabsPageOrSiginInOrSignUpPage(token: string|false): Observable<typeof TabsPage|typeof SiginInOrSignUpPage> {
  return Observable.of(token === false ? SiginInOrSignUpPage : TabsPage);
}
