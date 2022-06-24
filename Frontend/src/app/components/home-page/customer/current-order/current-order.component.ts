import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/entities/order/order';
import { OrderStatus } from 'src/app/entities/enums/order-status.enum';
import { OrderService } from 'src/app/services/order-service/order.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { OrderDto } from 'src/app/_interfaces/order-dto';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {
  order: OrderDto;
  deliveryTime: Date;
  minutes: number=0;
  interval: any;
  seconds: number=0;
  status: string;

  constructor(private orderService: OrderService) { 
  }

  ngOnInit(): void {
    this.orderService.findCurrentOrder().subscribe({
      next: (res: OrderDto)=>{
        // let c1=res.orderStatus;
        // console.log(res);
        // console.log(typeof(c1));
        this.order=res;
        if(res.orderStatus==OrderStatus.Ordered)
          this.status='Ordered';
        else if(res.orderStatus==OrderStatus.OnTheWay)
          this.status='OnTheWay';
        else if(res.orderStatus==OrderStatus.Delivered)
          this.status='Delivered';
        // console.log('status:'+ this.status);
        if(res.deliveryTime!=null ){
          let date=new Date(res.deliveryTime);
          let currentDate:Date=new Date();
          console.log(date);
          console.log(currentDate);
          if(currentDate.getSeconds()!==0)
            this.minutes=Math.abs((date.getMinutes()-1)-currentDate.getMinutes());
          else
            this.minutes=Math.abs(date.getMinutes()-currentDate.getMinutes());
          if(date.getMinutes()==0 || currentDate.getMinutes()==0)
            this.seconds=60-Math.abs(date.getSeconds()-currentDate.getSeconds());
          else
            this.seconds=60-Math.abs(date.getSeconds()-currentDate.getSeconds());
          //console.log(date);
          console.log(this.minutes);
          console.log(this.seconds);
        }
        
      },
      error: (err: HttpErrorResponse)=>{}
    });

    
    
    console.log(this.minutes)
    console.log(this.seconds)
    //console.log(this.order.deliveryTime)
    //console.log(currentDate)
    this.startTimer();
  }
  startTimer() {
    this.interval = setInterval(() => {
      
        if(this.seconds > 0) {
          this.seconds--;
        } else {
          this.seconds = 60;
          this.minutes--;
        }
        if(this.seconds==0 && this.minutes==0){
          clearInterval(this.interval);
        }
    },1000)
  }
  

}
