import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/entities/order/order';
import { User } from 'src/app/entities/user/user';
import { OrderService } from 'src/app/services/order-service/order.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { OrderForDelivererDto } from 'src/app/_interfaces/order-for-deliverer-dto';

@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.css']
})
export class GetOrderComponent implements OnInit {
  list: OrderForDelivererDto[];
  userId: number;
  constructor(private orderService:OrderService, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.orderService.freeOrdersforDeliverers().subscribe({
      next: (res: OrderForDelivererDto[])=>{
        this.list=res;
      },
      error: (err: HttpErrorResponse)=>{}
    });
  }
  
  add(){
    //this.orderService.orderAcceptedByDeliverer(orderId, this.userId);
    this.router.navigateByUrl("/home");
  }

}
