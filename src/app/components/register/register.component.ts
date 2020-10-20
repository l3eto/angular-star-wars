import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstname: string = '';
  lastname: string = '';
  username: string = '';
  password: string = '';
  dataLoading: boolean = false;
  form = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(1)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(1)]),
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    //  TODO: logic register serviceng
    console.log(this.form);
  }

  hasError(name: string, type: string) {
    var input = this.form.get(name);
    return input.dirty && input.errors && input.errors[type] == true;
  }

}
