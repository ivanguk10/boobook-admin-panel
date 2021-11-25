import { Injectable } from '@angular/core';
import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Endpoints} from '../constants/endpoints';
import {OrderModel} from '../models/order.model';
import {LoginModel} from '../models/login.model';
import {RequestUserModel} from '../models/reuest.user.model';
import {catchError, map} from 'rxjs/operators';
import {BaseApiService} from './base.api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {

  constructor(private http: HttpClient, private endpoints: Endpoints) {
    super();
  }

  public Login(requestUser: RequestUserModel): Observable<LoginModel>{
    let url = this.endpoints.getLoginUrl();
    url = url + '?email=' + requestUser.Email + '&password=' + requestUser.Password;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json');

    return this.http
      .post<LoginModel>(url, requestUser, {headers});
  }

  public SetAccessToken(accessToken: string): void{
    localStorage.setItem('BooBook.Token', accessToken);
  }

  public GetAccessToken(): string{
    return localStorage.getItem('BooBook.Token');
  }

  public GetAccessHeader(): {headers: HttpHeaders}{
    return {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.GetAccessToken()}`)
    };
  }

  public HasAccessToken(): boolean{
    const token =  localStorage.getItem('BooBook.Token');
    return token !== '' && token != null;
  }

}
