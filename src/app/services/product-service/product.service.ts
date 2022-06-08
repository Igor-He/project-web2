import { Injectable } from '@angular/core';
import { Product } from 'src/app/entities/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  listProducts: Array<Product>;
  constructor() { 
    this.listProducts=new Array<Product>();
    this.mockedProducts();
  }

  loadProducts(): Array<Product>{
    return this.listProducts;
  }
  mockedProducts(){
    const p1=new Product('Pizza', 200, 'Pelat, sir, sunka');
    const p2=new Product('Pasta', 200, 'Pelat, sir, sunka');
    const p3=new Product('Burger', 200, 'Pelat, sir, sunka');
    const p4=new Product('Meat', 200, 'Pelat, sir, sunka');
    this.listProducts.push(p1);
    this.listProducts.push(p2);
    this.listProducts.push(p3);
    this.listProducts.push(p4);
  }

  createProduct(p: Product){
    this.listProducts.push(p);
  }
  
  findProduct(name: string): Product{
    let product=new Product();
    this.listProducts.forEach(x => {
      if(x.name==name){
        product=x;
      }
    });
    return product;
  }
}
