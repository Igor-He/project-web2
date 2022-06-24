import { ProductOrderDto } from "./product-order-dto";

export interface OrderForDelivererDto {
    id?: number;
    products: Array<ProductOrderDto>;
    address: string;
    comment?: string;
    price: number;
    customerId: string;
}
