import { Component, Input, OnInit } from '@angular/core';
import {AuthorModel} from '../../../../../@core/models/author.model';
import {AuthorService} from '../../../../../@core/services/author.service';
import {OrderModel} from '../../../../../@core/models/order.model';
import {OrderService} from '../../../../../@core/services/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
})
export class OrderItemComponent implements OnInit {
  @Input() order: OrderModel;

  constructor(private orderService: OrderService
  ) {}

  public onDeliveredClick(): void {
    this.orderService.MarkOrderAsDelivered(this.order.id).subscribe(val => this.order.status = val.status);
  }

  ngOnInit(): void {
  }
}
