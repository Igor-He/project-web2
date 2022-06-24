import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderStatus } from 'src/app/entities/enums/order-status.enum';
import { Order } from 'src/app/entities/order/order';
import { ProductOrder } from 'src/app/entities/product-order/product-order';
import { Product } from 'src/app/entities/product/product';
import { User } from 'src/app/entities/user/user';
import { OrderService } from 'src/app/services/order-service/order.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { OrderDto } from 'src/app/_interfaces/order-dto';
import { ProductOrderDto } from 'src/app/_interfaces/product-order-dto';
import { ProductsDto } from 'src/app/_interfaces/products-dto';
import { UserProfileDto } from 'src/app/_interfaces/user-profile-dto';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  list: ProductsDto[];
  cart: ProductOrderDto[];
  address: string;
  price: number;
  priceDeliver: number;
  ordered: boolean=false;
  constructor(private productService:ProductService, private userService:UserService, private orderService:OrderService) { }

  ngOnInit(): void {
    this.productService.loadProducts().subscribe({
      next: (res: ProductsDto[])=>{
        this.list=res;
      },
      error: (err: HttpErrorResponse)=>{}
    });
    this.cart=[];
    this.price=0;
    this.priceDeliver=0;
    this.userService.getUserById().subscribe({
      next: (res: UserProfileDto)=>{
        this.address=res.address;
      },
      error: (err:HttpErrorResponse)=>{}
    });

  }
  addToCart(prod:ProductsDto){
    let exist=false;
    this.cart.forEach(x => {
      if(x.product==prod){
        x.quantity+=1;
        this.price+=x.product.price;
        this.priceDeliver=this.price+290;
        exist=true;
      }
    });
    if(!exist){
      const quantity=1;
      const prodOrderDto: ProductOrderDto={
        product: prod,
        quantity: quantity
      }
      this.cart.push(prodOrderDto);
      this.price+=prod.price;
      this.priceDeliver=this.price+290;
    }
  }

  createOrder(){
    let comment = (<HTMLInputElement> document.getElementById("comment")).value;
    const orderDto: OrderDto={
      products: this.cart,
      address: this.address,
      comment: comment,
      price: this.priceDeliver,
      customerId: this.userService.getUserId(),
      orderStatus: OrderStatus.Ordered

    };
    this.orderService.createOrder(orderDto).subscribe({
      next: ()=>{
        this.ordered=true;
        this.cart=[];
        this.price=0;
        this.priceDeliver=0;
      },
      error: (err: HttpErrorResponse)=>{}
    });
  }

}
