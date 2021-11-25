import {UserService} from '../../../@core/services/user.service';

export interface LoginResponse {
  status: string;
  data: any;
  token: string;
  message: string;
  is_admin?: number;
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Endpoints} from '../../../@core/constants/endpoints';
import {Observable} from 'rxjs';
import {LoginModel} from '../../../@core/models/login.model';
import {RequestUserModel} from '../../../@core/models/reuest.user.model';
import {HandleAlert} from '../../../@core/components/handle.alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends HandleAlert implements OnInit {
  loginForm: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private endpoints: Endpoints
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;

    const password = this.loginForm.value.password;
    const loginModel: RequestUserModel = new RequestUserModel(email, password);

    this.login(loginModel).subscribe(
      (res: LoginModel) => {
        if (res.role === 1){
          this.userService.SetAccessToken(res.accessToken);
          this.router.navigate(['/menu']);
        }
        else {
          this.message = 'User is not admin';
        }
        },
      error => {
        this.message = 'Credits are invalid';
        this.loginForm.get('password').reset();
      }
    );
  }

  private login(loginModel: RequestUserModel): Observable<LoginModel> {
    return this.userService.Login(loginModel);
  }


  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required,
        Validators.maxLength(255),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),
      ]),
    });
  }
  get f(): any {
    return this.loginForm.controls;
  }
}
