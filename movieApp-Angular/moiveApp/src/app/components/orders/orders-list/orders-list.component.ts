import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders-service/orders.service';
import { Order } from '../../../models/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders = [];
  seats = [];
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((data) => {
      this.orders = data;
      console.log(data);

    })
  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId).subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error)
    },()=>{
      this.orderService.getAllOrders().subscribe((data) => {
        this.orders = data;
        console.log(data);
  
      })
    })

  }

}