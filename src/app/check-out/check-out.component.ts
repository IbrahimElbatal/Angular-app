import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Router } from '@angular/router';
import { Order, OrderDetails } from './../models/order.class';
import { Cart } from './../models/cart.class';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {

  @ViewChild('orderForm') OrderForm : NgForm;

  subscribtion :Subscription;
  cart :Cart;
  items : number = 0;
  total : number = 0;
  order : Order = new Order();

  constructor(
    private router:Router,
    private cartser:ShoppingCartService,
    private orderService: OrderService) { 
  }

  ngOnInit() {
    this.subscribtion = this.cartser.subject
      .subscribe(cart=>{
        this.cartser.cart = this.cart = cart;
        if(this.cart){
          this.items = this.cartser.getTotalQuantity;
          this.total = this.cartser.getTotalPrice;
        }
    });
  }
  
  saveOrder(){
    let order: Order = this.initializeOrder();

    this.orderService.saveOrder(order)
    .subscribe(() => {
      localStorage.removeItem('cart');
      this.cartser.subject.next({shoppingCart:[]});
      this.OrderForm.reset();
      this.router.navigate(['/orders/order-success']);
    });
  }

  private initializeOrder() {
    let details: OrderDetails[] = [];

    this.cart.shoppingCart.filter(sc => {
      details.push({ 
                      productId: sc.id,
                      title:sc.title,
                      price :sc.price,
                      categoryKey:sc.categoryKey,
                      quantity: sc.quantity 
                    });
                  });

    var userId = (JSON.parse(localStorage.getItem('user')) as User).id;

    let order: Order = {
      userId : userId,
      name: this.order.name,
      address1: this.order.address1,
      address2: this.order.address2,
      city: this.order.city,
      orderDetails: details,
      createdDate :new Date()
    };

    return order;
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

}
