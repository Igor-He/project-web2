import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/entities/order/order';
import { ProductOrder } from 'src/app/entities/product-order/product-order';
import { Product } from 'src/app/entities/product/product';
import { User } from 'src/app/entities/user/user';
import { OrderService } from 'src/app/services/order-service/order.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  list: Array<Product>;
  cart: Array<ProductOrder>;
  price: number;
  priceDeliver: number;
  user: User;
  ordered: boolean=false;
  constructor(private productService:ProductService, private userService:UserService, private orderService:OrderService) { }

  ngOnInit(): void {
    const userUsername = JSON.parse(localStorage.getItem('sessionName') || '{}');
    this.user=this.userService.listUsers.find(x=>x.username==userUsername) || new User();
    this.list=this.productService.listProducts;
    this.cart=new Array<ProductOrder>();
    this.price=0;
    this.priceDeliver=0;
  }
  addToCart(name:string){
    let exist=false;
    const prod=this.productService.findProduct(name);
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
      this.cart.push(new ProductOrder(prod, quantity));
      this.price+=prod.price;
      this.priceDeliver=this.price+290;
    }
  }

  createOrder(){
    let comment = (<HTMLInputElement> document.getElementById("comment")).value;
    this.orderService.createOrder(new Order(0, this.cart, this.user.address, comment, this.priceDeliver, -1, this.user.id));
    console.log(this.orderService.listOrders);
    this.ordered=true;
  }

}
