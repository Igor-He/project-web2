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
        this.order=res;
        console.log('status:'+ this.status);
        if(res.deliveryTime!=null ){
          let date=new Date(res.deliveryTime);
          let currentDate:Date=new Date();
          console.log(date);
          console.log(currentDate);
          this.setMinutesAndSeconds(date, currentDate);
          
          console.log(this.minutes);
          console.log(this.seconds);
        }
        
      },
      error: (err: HttpErrorResponse)=>{}
    });
    this.startTimer();
  }

  setMinutesAndSeconds(date: Date, currentDate: Date){
    if(date.getMinutes()>=currentDate.getMinutes()){
      if(date.getSeconds()>=currentDate.getSeconds()){
        this.minutes=Math.abs((date.getMinutes())-currentDate.getMinutes());
        this.seconds=Math.abs(date.getSeconds()-currentDate.getSeconds());
      }else if(date.getSeconds()<currentDate.getSeconds()){
        this.minutes=Math.abs((date.getMinutes()-1)-currentDate.getMinutes());
        this.seconds=(60-currentDate.getSeconds())+date.getSeconds();
      }
    }else if(date.getMinutes()<currentDate.getMinutes()){
      if(date.getSeconds()>=currentDate.getSeconds()){
        this.minutes=(60-currentDate.getMinutes())+date.getMinutes();
        this.seconds=Math.abs(date.getSeconds()-currentDate.getSeconds());
      }else if(date.getSeconds()<currentDate.getSeconds()){
        this.minutes=(60-currentDate.getMinutes())+date.getMinutes();
        this.seconds=(60-currentDate.getSeconds())+date.getSeconds();
      }
    }
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
