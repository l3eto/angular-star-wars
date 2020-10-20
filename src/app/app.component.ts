import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
import { GlobalService } from './services/global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-star-wars';
  restrictedPages: string[] = ['/login', '/register'];
  loggedIn: boolean = false;

  constructor(
    public router: Router, 
    private globalService: GlobalService) 
  {

    //  event on route navigation change
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.validateNavigation(val.url);
      }
    });

  }

  //  validate navigation
  validateNavigation(path: string) 
  {
    if (path) {
      if (!this.globalService.isLoggedIn() && (this.restrictedPages.indexOf(path) === -1)) {
        this.router.navigate(['/login']);
      }
    }
  }

}
