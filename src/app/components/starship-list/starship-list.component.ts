import { StarshipService } from './../../services/starship/starship.service';
import { Component, OnInit } from '@angular/core';
import { Starship } from 'src/app/models/starship';
import { PageResponse } from 'src/app/models/page-response';

@Component({
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss']
})
export class StarshipListComponent implements OnInit {

  error: boolean = false;
  starships: Starship[] = [];
  lastResponse: PageResponse = null;

  constructor(private starshipService: StarshipService) { }

  ngOnInit(): void {
    this.fetchNextPage();
  }

  fetchNextPage() {
    let url: string = (this.lastResponse != null ? this.lastResponse.next : null);
    this.starshipService.getStarships(url).subscribe((response: PageResponse) => {
      console.log(response);
      if (response) {
        this.starships = this.starships.concat(response.results);
        this.lastResponse = response;
      }
    });
  }

  getSrc(url: string) {
    let id: string = url.split("/").filter((item: string) => {
      return item !== "";
    }).slice(-1)[0];
    return 'https://starwars-visualguide.com/assets/img/starships/' + id + '.jpg';
  }

}
