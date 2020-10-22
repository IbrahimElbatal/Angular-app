import { Order } from './../../models/order.class';
import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  items :Order[] =[];
  itemCount :number;

  dataTableResource : DataTableResource<Order>;

  constructor(private orderService : OrderService) { }

  ngOnInit() {
    this.orderService.getAdmin()
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
