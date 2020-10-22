import { HttpService } from './services/http/http.service';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
import { Global } from './models/global';
import { GlobalService } from './services/global/global.service';
import { FlashService } from './services/flash/flash.service';
import { Flash } from './models/flash';
import { EventEmitterService } from './services/event-emitter/event-emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-star-wars';
  restrictedPages: string[] = ['/login', '/register'];
  loggedIn: boolean = false;
  flash: Flash = null;

  constructor(
    private eventEmitterService: EventEmitterService,
    private router: Router,
    private httpService: HttpService,
    private flashService: FlashService,
    private globalService: GlobalService) 
  {

    //  emitter flash
    if (this.eventEmitterService.emitFlash == undefined) {
      this.eventEmitterService.emitFlash = this.eventEmitterService.invokeFlash.subscribe((flash: Flash) => {
        this.flash = flash;
      });
    }

    //  keep authorization user
    let data: Global = this.globalService.getData(true);
    if (data != null && data.currentUser) {
      this.httpService.setAuthorization(data.currentUser.authdata);
    }

    //  event on route navigation change
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && val.url) {
        this.validateNavigation(val.url);
        this.flashService.clear();
      }
    });

  }

  //  validate navigation
  validateNavigation(path: string) {
    if (!this.globalService.isLoggedIn() && (this.restrictedPages.indexOf(path) === -1)) {
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn() {
    return this.globalService.isLoggedIn();
  }

  isRouteActive(name: string) {
    return this.router.url.indexOf(name) !== -1;
  }

  getCurrentUserName() {
    let data: Global = this.globalService.getData(false);
    return data != null && data.currentUser != null ? data.currentUser.username : null;
  }

}
