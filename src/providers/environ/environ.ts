import { Injectable } from '@angular/core';

const defaultEnviron = {
  mode: 'dev',
  log: true,
  debug: false,
};
/*
  Generated class for the EnvironProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Environ {

  static environ: {[key:string]:any} = defaultEnviron;

  constructor() {
    console.log('Hello EnvironProvider Provider');
  }

  static withEnviron(environ: {[key:string]:any} = defaultEnviron) {
    Object.keys(environ)
      .forEach(key => Environ.environ[key] = environ[key]);
    return Environ;
  }

  static log(...vargs) { if (Environ.environ.log) console.debug(...vargs) }

}
