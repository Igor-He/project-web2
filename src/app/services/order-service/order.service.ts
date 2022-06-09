import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { OrderStatus } from 'src/app/entities/enums/order-status.enum';
import { UserStatus } from 'src/app/entities/enums/user-status.enum';
import { Order } from 'src/app/entities/order/order';
import { ProductOrder } from 'src/app/entities/product-order/product-order';
import { Product } from 'src/app/entities/product/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  listOrders: Array<Order>;
  constructor() { 
    this.listOrders=new Array<Order>();
    this.mockedOrders();
  }
  mockedOrders(){
    let prodOrders:Array<ProductOrder>=new Array<ProductOrder>();
    const prodOrder=new ProductOrder(new Product('Pizza', 250, 'urnebes, pavlaka'), 3);
    const prodOrder2=new ProductOrder(new Product('Pasta', 250, 'urnebes, pavlaka'), 3);
    prodOrders.push(prodOrder);
    prodOrders.push(prodOrder2);
    let date: Date=new Date();    
    date.setMinutes(date.getMinutes()+2);
    const o1=new Order(1, prodOrders, 'Cvecarska 2a', '', 1790, -1, 1, OrderStatus.OnTheWay, date);
    this.listOrders.push(o1);
  }
  createOrder(o: Order){
    this.listOrders.push(o);
  }
  findCurrentOrder(userId: number): Order{
    let order:Order=new Order();
    this.listOrders.forEach(x => {
      if(x.customerId==userId && (x.status==OrderStatus.Ordered || x.status==OrderStatus.OnTheWay)){
        order=x;
      }
    });

    return order;
  }
}
