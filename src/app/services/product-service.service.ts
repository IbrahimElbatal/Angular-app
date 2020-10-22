import { map } from 'rxjs/operators';
import { Product } from './../models/product.class';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url :string = "";
  constructor(private _http:HttpClient
              ) { }

  getAll() : Observable<Product[]>{
    this.url = "https://store-f97a3.firebaseio.com/products.json";
    return this._http.get<Product[]>(this.url)
      .pipe(map(res => {
          var products:Product[] = [];
          var keys = Object.keys(res);
          keys.forEach(key=>{
              var product = new Product(res[key]);
              products.push({'id' :key,...product});
          });
          return products;
      }));
  }

  get(id : string) : Observable<Product>{
    this.url = `https://store-f97a3.firebaseio.com/products/${id}.json`;
    return this._http.get<Product>(this.url)
      .pipe(map(res=>{
        var product = new Product(res);
        product.id = id;
        return product;
      }));
  }

  create(product : Product) : Observable<Product>{
    this.url = "https://store-f97a3.firebaseio.com/products.json";
    
    return this._http.post<Product>(this.url,product);
  }
  update(id : string ,product : Product){
    this.url = `https://store-f97a3.firebaseio.com/products/${id}.json`;
    console.log(id);
    console.log(product);
     return this._http.put<Product>(this.url,product);
  }
  delete(id : string) : Observable<Product>{
    this.url = `https://store-f97a3.firebaseio.com/products/${id}.json`;
    return this._http.delete<Product>(this.url);

  }
}
