import { Injectable } from '@angular/core';
import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Endpoints} from '../constants/endpoints';
import {BaseApiService} from './base.api.service';
import {AuthorModel} from '../models/author.model';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends BaseApiService {

  constructor(private http: HttpClient, private endpoints: Endpoints, private userService: UserService) {
    super();
  }

  public GetAuthors(): Observable<AuthorModel[]>{
    const url = this.endpoints.getAuthorsUrl();
    return this.http
      .get<AuthorModel[]>(url, this.userService.GetAccessHeader());
  }

  public GetAuthor(id: number): Observable<AuthorModel>{
    const url = this.endpoints.getAuthorsUrl() + '/' + id;

    return this.http
      .get<AuthorModel>(url, this.userService.GetAccessHeader());
  }

  public AddAuthor(author: AuthorModel): Observable<AuthorModel>{
    const url = this.endpoints.getAuthorsUrl();

    return this.http
      .post<AuthorModel>(url, author, this.userService.GetAccessHeader());
  }

  public UpdateAuthor(author: AuthorModel): Observable<AuthorModel>{
    const url = this.endpoints.getAuthorsUrl();

    return this.http
      .put<AuthorModel>(url, author, this.userService.GetAccessHeader());
  }

  public DeleteAuthor(id: number): Observable<any>{
    const url = this.endpoints.getAuthorsUrl() + '/' + id;

    return this.http
      .delete<any>(url, this.userService.GetAccessHeader());
  }

}
