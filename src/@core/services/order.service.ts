import { Injectable } from '@angular/core';
import {Observable, of, throwError as observableThrowError} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Endpoints} from "../constants/endpoints";
import {OrderModel} from "../models/order.model";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,private endpoints: Endpoints, private userService: UserService) {
  }

  public getOrders() : Observable<OrderModel[]>{
    const url = this.endpoints.getOrdersUrl();

    return this.http
      .get<OrderModel[]>(url, this.userService.GetAccessHeader());
  }

  public MarkOrderAsDelivered(idDelivered: number): Observable<OrderModel>{
    const url = this.endpoints.getOrdersUrl();

    const orderModel = new OrderModel();
    orderModel.id = idDelivered;
    orderModel.status = 2;

    return this.http
      .put<OrderModel>(url, orderModel, this.userService.GetAccessHeader());
  }

}
