export class Order{
    userId?:string;
    id?:string;
    name : string;
    city : string;
    address1 : string;
    address2 : string;
    orderDetails? : OrderDetails[];
    createdDate : Date ;
}

export class OrderDetails{
    productId? : string;
    title:string;
    categoryKey : string;
    price:number
    quantity : number;
}