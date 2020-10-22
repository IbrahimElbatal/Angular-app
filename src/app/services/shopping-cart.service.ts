import { ShoppingCart } from './../models/ShoppingCart';
import { Injectable, OnInit } from '@angular/core';
import { Product } from '../models/product.class';
import { Cart } from '../models/cart.class';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  subject = new BehaviorSubject<Cart>({shoppingCart:[]});
  cart : Cart;
  quantity: number;

  constructor() {
    if(!this.cart){
      this.cart = JSON.parse(localStorage.getItem('cart')) ||  { shoppingCart : []};
      this.subject.next(this.cart);
    }
  }

  addToCart(product : Product){
     this.GetOrCreateShoppingCart(product);
     localStorage.setItem('cart' , JSON.stringify(this.cart));
  }

  removeFromCart(product : Product){
    this.updateQuantity(product.id , -1);  
  }

  private GetOrCreateShoppingCart(product: Product) {
    if (!this.cart.shoppingCart.some(sc=>sc.title == product.title))
       this.cart.shoppingCart.push(new ShoppingCart({ ...product, quantity: 1 }));
    else
      this.updateQuantity(product.id, 1);

    this.subject.next(this.cart);
  }

  private updateQuantity(productId : string , change : number){
    let index = this.cart.shoppingCart.findIndex(sc=>sc.id === productId)
    this.cart.shoppingCart[index].quantity += change;

    if(this.cart.shoppingCart[index].quantity === 0)
      this.cart.shoppingCart.splice(index,1);

    localStorage.setItem('cart' , JSON.stringify(this.cart));
    this.subject.next(this.cart);
  }

  isProductInCart(productId : string) : boolean {
    if(!this.cart)return false;
    return this.cart.shoppingCart.some(sc => sc.id === productId);
  }

  getQuantity(productId) : number{
    if(!this.cart)return 0;

    let quantity = 0;
    this.cart.shoppingCart.filter(sc => {
      if(sc.id === productId)
        quantity = sc.quantity;
    });
    
    return quantity;
  }

  get getTotalPrice() {
    let total = 0;

    if(this.cart.shoppingCart)
      this.cart.shoppingCart.filter(sc => total +=(sc.quantity * sc.price));
    return total;
  }

  get getTotalQuantity(){
    let quantity = 0;

    if(this.cart.shoppingCart)
      this.cart.shoppingCart.filter(sc => quantity +=sc.quantity);
    return quantity;
  }
}
