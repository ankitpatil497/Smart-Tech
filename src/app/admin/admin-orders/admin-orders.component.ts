import { OrderService } from './../../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  order$;

  constructor(private orderService:OrderService) {
    this.order$=orderService.getOrder();
   }

  ngOnInit(): void {
  }

}
