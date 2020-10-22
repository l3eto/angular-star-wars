import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Starship } from 'src/app/models/starship';
import { StarshipService } from 'src/app/services/starship/starship.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-starship-view',
  templateUrl: './starship-view.component.html',
  styleUrls: ['./starship-view.component.scss']
})
export class StarshipViewComponent implements OnInit {

  starship: Starship = new Starship();
  dataLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private starshipService: StarshipService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.dataLoading = true;
    this.starshipService.getStarship(this.route.snapshot.params.id).subscribe((response: Starship) => {
      if (response) {
        this.starship = this.setId(response);
        this.dataLoading = false;
      }
    });
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

  back() {
    this.location.back();
  }

}
