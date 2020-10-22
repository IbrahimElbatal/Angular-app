import { ShoppingCartService } from './../services/shopping-cart.service';
import { Cart } from './../models/cart.class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  constructor(public _cartService : ShoppingCartService) {
    
   }

   clearCart(){
     localStorage.removeItem('cart');
     this._cartService.subject.next({shoppingCart : []});
    //  this._cartService.cart = new Cart();
   }

}
