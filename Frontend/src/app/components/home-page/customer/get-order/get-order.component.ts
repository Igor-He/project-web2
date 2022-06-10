import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/entities/order/order';
import { User } from 'src/app/entities/user/user';
import { OrderService } from 'src/app/services/order-service/order.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.css']
})
export class GetOrderComponent implements OnInit {
  list: Array<Order>;
  userId: number;
  constructor(private orderService:OrderService, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('sessionId') || '{}');
    this.list=this.orderService.freeOrdersforDeliverers();
  }
  
  add(orderId: number){
    this.orderService.orderAcceptedByDeliverer(orderId, this.userId);
    this.router.navigateByUrl("/home");
  }

}
