export class Product {
    id: number;
    name: string;
    price: number;
    ingredient : string;

    constructor(name: string='', price: number=0, ingredient: string=''){
        this.id=0;
        this.name=name;
        this.price=price;
        this.ingredient=ingredient;
    }
}
