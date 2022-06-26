import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order-service/order.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { OrderForDelivererDto } from 'src/app/_interfaces/order-for-deliverer-dto';
import { PickUpOrderDto } from 'src/app/_interfaces/pick-up-order-dto';

@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.css']
})
export class GetOrderComponent implements OnInit {
  list: OrderForDelivererDto[];
  constructor(private orderService:OrderService,private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.orderService.freeOrdersforDeliverers().subscribe({
      next: (res: OrderForDelivererDto[])=>{
        this.list=res;
      },
      error: (err: HttpErrorResponse)=>{}
    });
  }
  
  add(order: OrderForDelivererDto){
    if(order.id!=null){
    const pickUpOrderDto:PickUpOrderDto={
      orderId: order.id,
      delivererId: this.userService.getUserId()
    };

    this.orderService.orderAcceptedByDeliverer(pickUpOrderDto).subscribe({
      next: ()=>{
        this.orderService.sendStateChangeNotification(false);
      },
      error: (err:HttpErrorResponse)=>{}
    });
  }
  }

}
