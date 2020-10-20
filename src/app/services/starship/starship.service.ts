import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  constructor(private httpService: HttpService) { }

  getStarships(url: string) {
    if(!url) {
      url = 'https://swapi.dev/api/starships/';
    }
    return this.httpService.getNoAuth(url);
  }

}
