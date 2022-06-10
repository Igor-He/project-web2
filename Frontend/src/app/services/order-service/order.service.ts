import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { OrderStatus } from 'src/app/entities/enums/order-status.enum';
import { UserStatus } from 'src/app/entities/enums/user-status.enum';
import { UserType } from 'src/app/entities/enums/user-type.enum';
import { Order } from 'src/app/entities/order/order';
import { ProductOrder } from 'src/app/entities/product-order/product-order';
import { Product } from 'src/app/entities/product/product';
import { User } from 'src/app/entities/user/user';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  listOrders: Array<Order>;
  constructor(private userService:UserService) { 
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
    const o1=new Order(1, prodOrders, 'Cvecarska 2a', '', 1790, 2, 1, OrderStatus.Delivered, date);
    const o2=new Order(2, prodOrders, 'Cvecarska 2a', '', 1790, 2, 1, OrderStatus.Delivered, date);
    const o3=new Order(3, prodOrders, 'Cvecarska 2a', '', 2590, -1, 1, OrderStatus.Delivered, date);
    const o4=new Order(4, prodOrders, 'Cvecarska 2a', '', 1790, -1, 1, OrderStatus.Ordered, date);
    this.listOrders.push(o1);
    this.listOrders.push(o2);
    this.listOrders.push(o3);
    this.listOrders.push(o4);
  }
  createOrder(o: Order){
    this.listOrders.push(o);
  }
  findCurrentOrder(userId: number): Order{
    let userType: UserType;
    this.userService.listUsers.forEach(x => {
      if(x.id==userId){
        userType=x.type;
      }
    });
    let order:Order=new Order();
    this.listOrders.forEach(x => {
      if(userType==UserType.Dostavljac && (x.delivererId==userId) && x.status==OrderStatus.OnTheWay){
        order=x;
      }else if (userType==UserType.Potrosac && x.customerId==userId && (x.status==OrderStatus.Ordered || x.status==OrderStatus.OnTheWay)){
        order=x;
      }
    });

    return order;
  }
  freeOrdersforDeliverers(): Array<Order>{
    let list: Array<Order>=new Array<Order>();
    this.listOrders.forEach(x => {
      if(x.status==OrderStatus.Ordered){
        list.push(x);
      }
    });
    return list;
  }

  allOrders(userId: number): Array<Order>{
    let list: Array<Order>=new Array<Order>();
    const type: UserType=this.userService.getUserType(userId);
    if(type==UserType.Administrator){
      list=this.listOrders;
    }
    else if(type==UserType.Dostavljac)
    {
      this.listOrders.forEach(x => {
        if(x.delivererId==userId && x.status==OrderStatus.Delivered){
          list.push(x);
        }
      });
    }
    else if (type==UserType.Potrosac)
    {
      this.listOrders.forEach(x => {
        if(x.customerId==userId && x.status==OrderStatus.Delivered){
          list.push(x);
        }
      });
    }
    return list;
  }

  orderAcceptedByDeliverer(orderId:number, userId:number){
    this.listOrders.forEach(x => {
      if(x.id==orderId){
        x.delivererId=userId;
        x.status=OrderStatus.OnTheWay;
        let date: Date=new Date();    
        date.setMinutes(date.getMinutes()+5);
        x.deliveryTime=date;
        console.log(date);
      }
    });
  }
}