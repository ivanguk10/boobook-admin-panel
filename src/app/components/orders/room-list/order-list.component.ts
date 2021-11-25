import { Component, OnInit } from '@angular/core';
import {AuthorModel} from '../../../../@core/models/author.model';
import {AuthorService} from '../../../../@core/services/author.service';
import {Router} from '@angular/router';
import {OrderModel} from '../../../../@core/models/order.model';
import {OrderService} from '../../../../@core/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: OrderModel[];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res;
    });
  }
}
