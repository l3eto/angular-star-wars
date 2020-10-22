import { HttpService } from './../http/http.service';
import { GlobalService } from './../global/global.service';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Base64 } from 'src/app/utils/base64';
import { Global } from 'src/app/models/global';
import { ApiResponse } from 'src/app/models/api-response';

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
        if (user != null && user.password === password) {
          callback(new ApiResponse(true, 'Conectado correctamente.'));
        } else {
          callback(new ApiResponse(false, 'La combinación de usuario y contraseña no es correcta.'));
        }
      });
    }, 1000);
  }

  setCredentials(username: string, password: string) {      
    let authdata: string = Base64.encode(username + ':' + password);
    let data: Global = new Global(username, authdata);
    this.globalService.setData(data, true);
    this.httpService.setAuthorization(authdata);
  }

  clearCredentials() {
    this.globalService.clearData(true);
    this.httpService.clearAuthorization();
  }


}
