import { ProductsDto } from "./products-dto";

export interface ProductOrderDto {
    product: ProductsDto;
    quantity: number;
}
