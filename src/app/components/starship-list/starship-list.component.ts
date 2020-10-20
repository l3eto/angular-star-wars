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
  starships: Starship[] = [];
  lastResponse: PageResponse = null;

  constructor(
    private router: Router,
    private starshipService: StarshipService) { }

  ngOnInit(): void {
    this.fetchNextPage();
  }

  canFetchNextPage() {
    return this.lastResponse == null || this.lastResponse != null && this.lastResponse.next != null;
  }

  fetchNextPage() {
    let url: string = (this.lastResponse != null ? this.lastResponse.next : null);
    this.starshipService.getStarships(url).subscribe((response: PageResponse) => {
      if (response) {
        response.results.map((starship: Starship) => this.setId(starship));
        this.starships = this.starships.concat(response.results);
        this.lastResponse = response;
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

  errorHandler(event: any) {
    event.target.src = "assets/images/not-found.png";
  }


}
