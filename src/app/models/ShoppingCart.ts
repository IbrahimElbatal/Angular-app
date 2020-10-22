export class ShoppingCart {
    id?: string;
    price: number;
    title: string;
    imageUrl: string;
    quantity: number;
    categoryKey:string;

    constructor(init?:Partial<ShoppingCart>) {
        Object.assign(this , init);
    }
}
