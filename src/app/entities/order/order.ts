import { ProductOrder } from "../product-order/product-order";

export class Order {
    id: number;
    products: Array<ProductOrder>;
    address: string;
    comment: string;
    price: number;
    delivererId: number;
    customerId: number;

    constructor(id: number, products: Array<ProductOrder>, address: string, comment: string, price: number, delivererId: number, customerId: number){
        this.id=id;
        this.products=products;
        this.address=address;
        this.comment=comment;
        this.price=price;
        this.delivererId=delivererId;
        this.customerId=customerId;
    }

}
