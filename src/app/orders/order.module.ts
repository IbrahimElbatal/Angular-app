import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from '../authGuard.service';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { DataTableModule } from 'angular5-data-table';
import { CommonModule } from '@angular/common';

const routes : Routes = [
        {
            component : OrdersComponent ,
            path : "",
            canActivate :[AuthGuard]
        },
        {component : OrderSuccessComponent , path : "order-success",canActivate :[AuthGuard]},
        {component : OrderDetailsComponent , path : "order-details/:id"},
        {component : AdminOrdersComponent , path : "admin",canActivate :[AuthGuard]}   
]; 

@NgModule({
    declarations: [
        OrdersComponent,
        AdminOrdersComponent,
        OrderDetailsComponent,
        OrderSuccessComponent,
      ],
    imports:[
        RouterModule.forChild(routes),
        DataTableModule.forRoot(),
        CommonModule,
        FormsModule
    ],
    exports:[
        RouterModule
    ]
})
export class OrderModule{

}