import { HttpService } from './../http/http.service';
import { GlobalService } from './../global/global.service';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Base64 } from 'src/app/utils/base64';
import { Global } from 'src/app/models/global';
import { GlobalUser } from 'src/app/models/global-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private globalService: GlobalService) { }

  login(username: string, password: string, callback: Function) {
    setTimeout(() => {
      this.userService.getByUsername(username).then((user: User) => {
        let response: object;
        if (user !== null && user.password === password) {
          response = {success: true};
        } else {
          response = {success: false, message: 'Username or password is incorrect'};
        }
        callback(response);
      });
    }, 1000);
  }

  setCredentials(username: string, password: string) {      
    let authdata: string = Base64.encode(username + ':' + password);
    let data: Global = new Global(new GlobalUser(username, authdata));
    this.globalService.setData(data, true);
    this.httpService.setAuthorization(authdata);
  }

  clearCredentials() {
    this.globalService.clearData(true);
    this.httpService.clearAuthorization();
  }


}
