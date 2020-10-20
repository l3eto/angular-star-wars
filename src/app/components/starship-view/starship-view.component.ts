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

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private starshipService: StarshipService) { }

  ngOnInit(): void {
    this.starshipService.getStarship(this.route.snapshot.params.id).subscribe((response: Starship) => {
      if (response) {
        this.starship = this.setId(response);
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

  errorHandler(event: any) {
    event.target.src = "assets/images/not-found.png";
  }

  back() {
    this.location.back();
  }

}
