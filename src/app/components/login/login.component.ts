import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    //  TODO: logic login service
    console.log(this.form);
  }

  hasError(name: string, type: string) {
    var input = this.form.get(name);
    return input.dirty && input.errors && input.errors[type] == true;
  }

}
