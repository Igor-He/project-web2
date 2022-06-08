import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/entities/product/product';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  list: Array<Product>;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.list=this.productService.listProducts;
  }

}
