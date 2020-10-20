import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  options: object = {};

  constructor(private httpClient: HttpClient) { }

  setAuthorization(authdata: string) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + authdata
      })
    };
  }

  clearAuthorization() {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic'
      })
    };
  }

  get(url: string) {
    return this.httpClient.get(`${url}`, this.options);
  }

  getNoAuth(url: string, ) {
    return this.httpClient.get(`${url}`);
  }
}
