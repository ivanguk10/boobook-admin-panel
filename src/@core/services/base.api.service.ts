import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError as observableThrowError} from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {

  protected constructor() { }

  protected handleError(res: HttpErrorResponse | any): any {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
