
export class Product{
    id?:string;
    title:string;
    price : number;
    imageUrl:string;
    categoryKey : string;

    constructor(init? : Partial<Product>) {
        Object.assign(this,init);
    }
}