import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/entities/order/order';
import { User } from 'src/app/entities/user/user';
import { OrderService } from 'src/app/services/order-service/order.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  list: Array<Order>;
  user: User;
  constructor(private userService: UserService, private orderService: OrderService) { 
    
  }

  ngOnInit(): void {
    this.list=new Array<Order>();
  }

}
