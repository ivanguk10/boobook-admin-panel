import { Injectable } from '@angular/core';
import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Endpoints} from '../constants/endpoints';
import {OrderModel} from '../models/order.model';
import {BookModel} from '../models/book.model';
import {UserService} from './user.service';
import {BookUploadModel} from '../models/book.upload.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private endpoints: Endpoints, private userService: UserService) {
  }

  public getBooks(): Observable<BookModel[]>{
    const url = this.endpoints.getBooksUrl();

    return this.http
      .get<BookModel[]>(url, this.userService.GetAccessHeader());
  }

  public getBook(id: number): Observable<BookModel>{
    const url = this.endpoints.getBooksUrl() + '/' + id;

    return this.http
      .get<BookModel>(url, this.userService.GetAccessHeader());
  }

  public addBook(bookUploadModel: BookUploadModel): Observable<BookModel>{
    const url = this.endpoints.getBooksUrl();

    const formData = new FormData();
    for (const prop in bookUploadModel) {
      if (!bookUploadModel.hasOwnProperty(prop)) { continue; }
      if (prop === 'image'){
        formData.append(prop, bookUploadModel[prop], 'filename');
      }
      else{
        formData.append(prop, bookUploadModel[prop]);
      }
    }
    return this.http
      .post<BookModel>(url, formData, this.userService.GetAccessHeader());
  }

  public deleteBook(id: number): Observable<any>{
    const url = this.endpoints.getBooksUrl() + '/' + id;

    return this.http
      .delete<any>(url, this.userService.GetAccessHeader());
  }

}
