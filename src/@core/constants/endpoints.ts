import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Endpoints{
  public getBooksUrl(): string{
    return endpoints.rootUrl + '/books';
  }

  public getOrdersUrl(): string{
    return endpoints.rootUrl + '/orders';
  }

  public getAuthorsUrl(): string{
    return endpoints.rootUrl + '/authors';
  }

  public getLoginUrl(): string{
    return endpoints.rootUrl + '/users/login';
  }

  public getRootUrl(): string{
    return endpoints.rootUrl;
  }
}

const endpoints = {
  rootUrl: environment.rootUrl,
};

