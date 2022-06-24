import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/entities/product/product';
import { CreateProductDto } from 'src/app/_interfaces/create-product-dto';
import { ProductsDto } from 'src/app/_interfaces/products-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  path: string="https://localhost:5001/api/products";
  constructor(private http: HttpClient) { 
  }

  loadProducts(){
    return this.http.get<ProductsDto[]>(this.path);
  }

  createProduct(product: CreateProductDto){
    return this.http.post(this.path, product);
  }
  
}
