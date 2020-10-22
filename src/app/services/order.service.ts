import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrderDetails, Order } from '../models/order.class';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private _url = "https://store-f97a3.firebaseio.com/Orders.json";

  constructor(
    private _http:HttpClient,
    ) { }

  getOrderDetails(orderId:string) {
    this._url =`https://store-f97a3.firebaseio.com/Orders/${orderId}/orderDetails.json`;
    return  this._http.get<OrderDetails[]>(this._url)
      .pipe(
        map(res => {
          var keys = Object.keys(res);
          var orderDetails:OrderDetails[] = []
          keys.forEach(key=>{
          orderDetails.push({
            title : res[key].title,
            categoryKey : res[key].categoryKey,
            price : res[key].price,
            quantity : res[key].quantity,
          });
        });
        return orderDetails;
      }));
  }
  getAdmin(){
    this._url ="https://store-f97a3.firebaseio.com/Orders.json";
    return  this._http.get<Order[]>(this._url)
      .pipe(
        map(res => {
          var keys = Object.keys(res);
          var orders:Order[] = []
          keys.forEach(key=>{
          orders.push({
            id :key,
            name : res[key].name,
            city : res[key].city,
            address1 : res[key].address1,
            address2 : res[key].address2,
            createdDate : res[key].createdDate,
          });
        });
        return orders
      }));
  }
  getOrdesByUser(userId){
    this._url ="https://store-f97a3.firebaseio.com/Orders.json";
    return  this._http.get<Order[]>(this._url)
      .pipe(
        map(res=>{
          var keys = Object.keys(res);
          var orders:Order[] = []
          keys.forEach(key=>{
            if(res[key].userId === userId){
              orders.push({
                id :key,
                name : res[key].name,
                city : res[key].city,
                address1 : res[key].address1,
                address2 : res[key].address2,
                createdDate : res[key].createdDate,
              });
            }
        });
        return orders
      }));
  }
  
  saveOrder(order){
    return this._http.post<Order>(this._url,order);
  }
}
