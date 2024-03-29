import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/entities/product/product';
import { ProductService } from 'src/app/services/product-service/product.service';
import { CreateProductDto } from 'src/app/_interfaces/create-product-dto';

@Component({
  selector: 'app-adding-products',
  templateUrl: './adding-products.component.html',
  styleUrls: ['./adding-products.component.css']
})
export class AddingProductsComponent implements OnInit {
  newProductForm: FormGroup;
  isAdded: boolean=false;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.initForm();
  }
  private initForm() {
    this.newProductForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'ingredients': new FormControl(null, [Validators.required])
    }
    );
  }
  onSubmit() {
    const name=this.newProductForm.controls['name'].value;
    const price=this.newProductForm.controls['price'].value;
    const ingredients=this.newProductForm.controls['ingredients'].value;
    const product:CreateProductDto={
      name: name,
      price: price,
      ingredient: ingredients
    }
    this.productService.createProduct(product).subscribe({
      next: ()=>{
        this.isAdded=true;
        this.onClear();
      },
      error: (err: HttpErrorResponse)=>{}
    });
    
  }

  onClear() {
    this.newProductForm.reset();
  }
}
