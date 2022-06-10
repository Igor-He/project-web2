import { DeclarationListEmitMode } from "@angular/compiler";
import { OrderStatus } from "../enums/order-status.enum";
import { ProductOrder } from "../product-order/product-order";

export class Order {
    id: number;
    products: Array<ProductOrder>;
    address: string;
    comment: string;
    price: number;
    delivererId: number;
    customerId: number;
    status: OrderStatus;
    deliveryTime: Date;

    constructor(id: number=-1, products: Array<ProductOrder>=new Array<ProductOrder>(), address: string='', comment: string='', price: number=0, delivererId: number=-1, customerId: number=-1, status: OrderStatus=OrderStatus.Delivered, deliveryTime: Date=new Date()){
        this.id=id;
        this.products=products;
        this.address=address;
        this.comment=comment;
        this.price=price;
        this.delivererId=delivererId;
        this.customerId=customerId;
        this.status=status;
        this.deliveryTime=deliveryTime;
    }

}
