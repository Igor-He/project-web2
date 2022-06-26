import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/entities/order/order';
import { User } from 'src/app/entities/user/user';
import { OrderService } from 'src/app/services/order-service/order.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { OrderDto } from 'src/app/_interfaces/order-dto';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  list: OrderDto[];
  constructor(private orderService: OrderService) { 
    
  }

  ngOnInit(): void {
    this.orderService.allOrders().subscribe({
      next: (res: OrderDto[])=>{
        this.list=res;
      },
      error: (err: HttpErrorResponse)=>{}
    });
  }

}
