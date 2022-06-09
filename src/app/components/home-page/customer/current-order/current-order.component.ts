import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/entities/order/order';
import { User } from 'src/app/entities/user/user';
import { OrderService } from 'src/app/services/order-service/order.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {
  order: Order;
  user: User;
  minutes: number=0;
  interval: any;
  seconds: number=0;

  constructor(private orderService: OrderService, private userService: UserService) { 
    const id = JSON.parse(localStorage.getItem('sessionId') || '{}');
    this.user=this.userService.listUsers.find(x=>x.id==id) || new User();
    this.order=this.orderService.findCurrentOrder(id);
    let currentDate:Date=new Date();
    this.minutes=this.order.deliveryTime.getMinutes()-currentDate.getMinutes();
    this.seconds=this.order.deliveryTime.getSeconds()-currentDate.getSeconds();
    console.log('pozvano');
    
  }

  ngOnInit(): void {
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
