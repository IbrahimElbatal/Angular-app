import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { OrderDetails } from 'src/app/models/order.class';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  dataTableResource : DataTableResource<OrderDetails>;

  items:OrderDetails[] = [];
  itemCount :number;

  constructor(
    private orderService:OrderService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    var orderId = this.route.snapshot.paramMap.get('id');
    
    this.orderService.getOrderDetails(orderId)
      .subscribe(orderDetails=>{
        this.InitializeDataTableResource(orderDetails);
      });
  }
  private InitializeDataTableResource(orderDetails){
    this.dataTableResource =new DataTableResource(orderDetails);

    this.dataTableResource.query({offset :0})
      .then(items=>this.items=items);

    this.dataTableResource.count()
      .then(count =>this.itemCount = count);  
  }
  
  reloadOrderDetails(params){
    if(!this.dataTableResource) return;
    this.dataTableResource.query(params)
      .then(items=>this.items =items);
  }
}
