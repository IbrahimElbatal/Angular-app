import { ShoppingCartService } from './../services/shopping-cart.service';
import { Product } from './../models/product.class';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('showFooter') showFooter : boolean = false;
  @Input('product') product : Product;
  constructor(public cartService : ShoppingCartService) { }

  ngOnInit() {
  }
  
  isProductInCart(productId : string) : boolean {
    return this.cartService.isProductInCart(productId);
  }
  
  addToCart(product : Product) : void {
    this.cartService.addToCart(product);
  }

  removeFromCart(product : Product) : void{
   this.cartService.removeFromCart(product);
  }
}
