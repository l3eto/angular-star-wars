import { ApiResponse } from 'src/app/models/api-response';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  dataLoading: boolean = false;
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor(public router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  login() {
    this.dataLoading = true;
    this.authenticationService.login(this.username, this.password, (response: ApiResponse) => {
      if (response.success) {
        this.authenticationService.setCredentials(this.username, this.password);
        //$location.path('/ships');
        console.log(response.message);
        this.router.navigate(['/ships']);
      } else {
        //FlashService.Error(response.message);
        console.log(response.message);
        this.dataLoading = false;
      }
    });
  }

  hasError(name: string, type: string) {
    var input = this.form.get(name);
    return input.dirty && input.errors && input.errors[type] == true;
  }

}
