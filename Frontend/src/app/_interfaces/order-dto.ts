import { ProductOrderDto } from "./product-order-dto";

export interface OrderDto {
    id?: number;
    products: Array<ProductOrderDto>;
    address: string;
    comment?: string;
    price: number;
    delivererId?: string;
    customerId: string;
    orderStatus: string;
    deliveryTime?: Date;
}
