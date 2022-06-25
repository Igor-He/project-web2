import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order-service/order.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { IsNewDto } from 'src/app/_interfaces/is-new-dto';

@Component({
  selector: 'app-new-current-order',
  templateUrl: './new-current-order.component.html',
  styleUrls: ['./new-current-order.component.css']
})
export class NewCurrentOrderComponent implements OnInit {
  isNew: boolean;
  userType: string;
  constructor(private orderService: OrderService, private userService: UserService) { 
    this.orderService.newCurrentChanged.subscribe(
      res=>{
        this.isNew=res;
      }
    );
  }

  ngOnInit(): void {
    this.userType=this.userService.getUserType();
    console.log(this.userType);
        this.orderService.isNewOrCurrent().subscribe(
          {
            next:(res: IsNewDto)=>{
              this.isNew=res.isNew;
              console.log(this.isNew);
              this.orderService.sendStateChangeNotification(res.isNew);
            },
            error:()=>{}
          }
        );
  }

}
