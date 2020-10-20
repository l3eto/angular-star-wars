import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  apiUrl: string = 'https://swapi.dev/api/starships/';

  constructor(private httpService: HttpService) { }

  getStarships(url: string) {
    return this.httpService.getNoAuth(url ? url : this.apiUrl);
  }

  getStarship(id: string) {
    return this.httpService.getNoAuth(`${this.apiUrl}${id}/`);
  }

  

}
