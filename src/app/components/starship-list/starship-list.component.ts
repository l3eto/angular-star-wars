import { StarshipService } from './../../services/starship/starship.service';
import { Component, OnInit } from '@angular/core';
import { Starship } from 'src/app/models/starship';
import { PageResponse } from 'src/app/models/page-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss']
})
export class StarshipListComponent implements OnInit {

  error: boolean = false;
  loadingResponse: boolean = true;
  starships: Starship[] = [];
  lastResponse: PageResponse = null;

  constructor(
    private router: Router,
    private starshipService: StarshipService) { }

  ngOnInit(): void {
    this.fetchNextPage();
  }

  canFetchNextPage() {
    return !this.loadingResponse && (this.lastResponse == null || (this.lastResponse != null && this.lastResponse.next != null));
  }

  fetchNextPage() {
    let url: string = (this.lastResponse != null ? this.lastResponse.next : null);
    this.loadingResponse = true;
    this.starshipService.getStarships(url).subscribe((response: PageResponse) => {
      if (response) {
        response.results.map((starship: Starship) => this.setId(starship));
        this.starships = this.starships.concat(response.results);
        this.lastResponse = response;
        this.loadingResponse = false;
      }
    });
  }

  openStarship(starship: Starship) {
    this.router.navigate(['/ship', starship.id]);
  }

  setId(starship: Starship) {
    if (starship.url != null) {
      starship.id = starship.url.split("/").filter((item: string) => {
        return item !== "";
      }).slice(-1)[0];
    }
    return starship;
  }

  onLoadHandler(starship: Starship) {
    starship.loadedImage = true;
  }

  onErrorHandler(starship: Starship) {
    starship.loadedImage = true;
    starship.errorImage = true;
  }

}
