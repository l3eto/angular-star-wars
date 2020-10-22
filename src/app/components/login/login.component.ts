import { ApiResponse } from 'src/app/models/api-response';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { FlashService } from 'src/app/services/flash/flash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataLoading: boolean = false;
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor(
    private flashService: FlashService,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.clearCredentials();
  }

  login() {
    this.dataLoading = true;
    this.authenticationService.login(this.form.value.username, this.form.value.password, (response: ApiResponse) => {
      if (response.success) {
        this.authenticationService.setCredentials(this.form.value.username, this.form.value.password);
        //this.flashService.success(response.message, true);
        this.router.navigate(['/ships']);
      } else {
        this.flashService.error(response.message, false);
        this.dataLoading = false;
      }
    });
  }

  hasError(name: string, type: string) {
    var input = this.form.get(name);
    return input.dirty && input.errors && input.errors[type] == true;
  }

}
