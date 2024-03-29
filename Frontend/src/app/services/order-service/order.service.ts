import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderStatus } from 'src/app/entities/enums/order-status.enum';
import { UserStatus } from 'src/app/entities/enums/user-status.enum';
import { UserType } from 'src/app/entities/enums/user-type.enum';
import { Order } from 'src/app/entities/order/order';
import { ProductOrder } from 'src/app/entities/product-order/product-order';
import { Product } from 'src/app/entities/product/product';
import { User } from 'src/app/entities/user/user';
import { FindCurrentOrderDto } from 'src/app/_interfaces/find-current-order-dto';
import { IsNewDto } from 'src/app/_interfaces/is-new-dto';
import { OrderDto } from 'src/app/_interfaces/order-dto';
import { OrderForDelivererDto } from 'src/app/_interfaces/order-for-deliverer-dto';
import { OrdersByUserDto } from 'src/app/_interfaces/orders-by-user-dto';
import { PickUpOrderDto } from 'src/app/_interfaces/pick-up-order-dto';
import { environment } from 'src/environments/environment';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  path: string=environment.pathOrders;
  private newCurrentChangeSub = new Subject<boolean>()
  public newCurrentChanged = this.newCurrentChangeSub.asObservable();

  constructor(private userService:UserService, private http: HttpClient) { 
  }

  createOrder(order: OrderDto){
    return this.http.post(this.path, order);
  }

  sendStateChangeNotification (isNew: boolean){
    this.newCurrentChangeSub.next(isNew);
  }
  isNewOrCurrent(){
    const findCurrentOrderDto:FindCurrentOrderDto={
      userId: this.userService.getUserId()
    };
    return this.http.post<IsNewDto>(this.path+"/is-new", findCurrentOrderDto);
  }
  findCurrentOrder(){
    const findCurrentOrderDto:FindCurrentOrderDto={
      userId: this.userService.getUserId()
    };
    return this.http.post<OrderDto>(this.path+'/current', findCurrentOrderDto);
  }
  freeOrdersforDeliverers(){
    return this.http.get<OrderForDelivererDto[]>(this.path+'/available');
  }

  allOrders(){
    const dto: OrdersByUserDto={
      userId: this.userService.getUserId(),
      userType: this.userService.getUserType()
    }
    return this.http.post<OrderDto[]>(this.path+"/all-orders", dto);
  }
  changeOrder(id: string){
    return this.http.put(this.path+'/'+id, id);
  }

  orderAcceptedByDeliverer(pickUpOrderDto:PickUpOrderDto){
    return this.http.put(this.path, pickUpOrderDto);
  }
}
