import { ProductsDto } from "src/app/_interfaces/products-dto";
import { Product } from "../product/product";

export class ProductOrder {
    product: ProductsDto;
    quantity: number;

    constructor(product: ProductsDto, quantity: number){
        this.product=product;
        this.quantity=quantity;
    }
}
