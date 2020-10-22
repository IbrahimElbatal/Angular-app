import { User } from './../../models/user.model';
import { Order } from './../../models/order.class';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  items : Order [] =[];
  itemCount :number;

  dataTableResource : DataTableResource<Order>;

  constructor(private orderService : OrderService) { }

  ngOnInit() {
    var userId = (JSON.parse(localStorage.getItem('user')) as User).id;
    
    this.orderService.getOrdesByUser(userId)
      .subscribe(orders=>{
        this.InitializeDataTableResource(orders);
      });
  }

  private InitializeDataTableResource(orders){
    this.dataTableResource = new DataTableResource(orders);

    this.dataTableResource.query({offset : 0})
      .then(items=> this.items = items);

    this.dataTableResource.count()
      .then(count=>this.itemCount =count);  
  }
  reloadOrders(params){
    if(!this.dataTableResource) return;
    this.dataTableResource.query(params)
      .then(items=>this.items = items);
  }
  
}
