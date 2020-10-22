import { ShoppingCartService } from './../services/shopping-cart.service';
import { UserService } from './../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  // isAdmin: boolean;
  isAuthonticate : boolean;
  email:string;

  subscribtion:Subscription;

  constructor(public userservice:UserService,
              public _cartService : ShoppingCartService) 
  {
  }

 
  ngOnInit(): void {
   
    this.subscribtion =  this._cartService.subject
      .subscribe(cart=>{
            this._cartService.cart = cart;
          });

    this.subscribtion = this.userservice.user
        .subscribe(user=>{
            this.isAuthonticate = !!user;
            if(user)
              this.email =user.email; 
          });
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  Logout(){
    this.userservice.logout();
  }
}
