import { Injectable } from '@angular/core';
import { Order } from 'src/app/entities/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  listOrders: Array<Order>;
  constructor() { 
    this.listOrders=new Array<Order>();
  }

  createOrder(o: Order){
    this.listOrders.push(o);
}
}
