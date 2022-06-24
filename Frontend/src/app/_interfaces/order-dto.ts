import { OrderStatus } from "../entities/enums/order-status.enum";
import { ProductOrderDto } from "./product-order-dto";

export interface OrderDto {
    id?: number;
    products: Array<ProductOrderDto>;
    address: string;
    comment?: string;
    price: number;
    delivererId?: string;
    customerId: string;
    status: OrderStatus;
    deliveryTime?: Date;
}
