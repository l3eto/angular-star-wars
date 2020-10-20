import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Global } from 'src/app/models/global';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  data: Global = null;
  cookieName: string = 'globals';

  constructor() { }

  isLoggedIn() {
    return this.data != null && this.data.currentUser != null;
  }

  setData(data: Global, updateCookies: boolean) {
    this.data = data;
    if (updateCookies) {
      Cookie.set(this.cookieName, (data != null ? JSON.stringify(data) : null), 7);
    }
  }

  getData(updateCookies: boolean) {
    if (updateCookies) {
      var cookie = Cookie.get(this.cookieName);
      this.data = (cookie != null && typeof cookie !== 'undefined' ? JSON.parse(cookie) : null);
    }
    return this.data;
  }

  clearData(updateCookies: boolean) {
    this.data = null;
    if (updateCookies) {
      Cookie.delete(this.cookieName);
    }
  }

}
