import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order-service/order.service';
import { OrderForDelivererDto } from 'src/app/_interfaces/order-for-deliverer-dto';

@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.css']
})
export class GetOrderComponent implements OnInit {
  list: OrderForDelivererDto[];
  constructor(private orderService:OrderService, private router:Router) { }

  ngOnInit(): void {
    this.orderService.freeOrdersforDeliverers().subscribe({
      next: (res: OrderForDelivererDto[])=>{
        this.list=res;
      },
      error: (err: HttpErrorResponse)=>{}
    });
  }
  
  add(order: OrderForDelivererDto){
    console.log(order.id);
    //this.orderService.orderAcceptedByDeliverer(orderId, this.userId);
    //this.router.navigateByUrl("/home");
  }

}
