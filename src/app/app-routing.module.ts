import { NgModule } from "@angular/core";
import { RouterModule, Routes, NoPreloading } from '@angular/router';

import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { CheckOutModule } from './check-out/check-out.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './orders/order.module';
import { HomeComponent } from './home/home.component';
import { ProductModule } from './products/product.module';


const routes :Routes = [
    // {component : ProductsComponent , path : "products",canActivate :[AuthGuard,AdminGuardService]},
    // {component : OrdersComponent , path : "orders",canActivate :[AuthGuard,AdminGuardService]},
    // {component : AdminProductsComponent , path : "admin/products",canActivate :[AuthGuard,AdminGuardService]},
    // {component : AdminOrdersComponent , path : "admin/orders",canActivate :[AuthGuard,AdminGuardService]},

    
    {
        path : 'products' , 
        loadChildren : () => import('./products/product.module').then(m=>m.ProductModule)
    },
    {
        path : 'orders' ,
        loadChildren : ()=> import('./orders/order.module').then(m=>m.OrderModule) 
    },
    {
        path : 'shopping-cart' ,
        loadChildren : ()=> import('./shopping-cart/shopping-cart.module').then(m=>m.ShoppingCartModule) 
    },
    {
        path : 'check-out' ,
        loadChildren : ()=> import('./check-out/check-out.module').then(m=>m.CheckOutModule) 
    },
    {
        path : 'auth' ,
        loadChildren : ()=> import('./auth/auth.module').then(m=>m.AuthModule) 
    },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }, 
    {path:"**", pathMatch:'full' , redirectTo:"/"}
];
@NgModule({
    imports:[
       RouterModule.forRoot(routes , {preloadingStrategy : NoPreloading}),
    //    AuthModule,
    //    ProductModule,
    //    ShoppingCartModule,
    //    OrderModule,
    //    CheckOutModule
    ],
    exports:[
        RouterModule
    ]
})
export class AppRouting{

}