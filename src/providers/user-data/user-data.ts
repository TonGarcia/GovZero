import { Injectable } from '@angular/core';

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {

  public static get() {
    let user = JSON.parse(localStorage['auth']).user;
    if(!user) user = {};
    return user;
  }

  public static set(auth) {
    localStorage['auth'] = JSON.stringify(auth);
  }

  public static getProfile() {
    return JSON.parse(localStorage['profile']);
  }

  public static setProfile(profile) {
    localStorage['profile'] = JSON.stringify(profile);
  }

}
