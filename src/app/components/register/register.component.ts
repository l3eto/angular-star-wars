import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/api-response';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  dataLoading: boolean = false;
  form = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(1)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(1)]),
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor(public router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  register() {
    this.dataLoading = true;
    this.userService.create(this.user).then((response: ApiResponse) => {
      if (response.success) {
        //FlashService.Success('Registration successful', true);
        console.log(response.message);
        this.router.navigate(['/login']);
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
