import { map } from 'rxjs/operators';
import { Category } from './../models/category.class';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url :string = "https://store-f97a3.firebaseio.com/Categories.json";
  constructor(private _http:HttpClient
              ) { }

  getAll() : Observable<Category[]>{
    return this._http.get<Category[]>(this.url)
      .pipe(map(res => {
        var categories = []
        var keys = Object.keys(res);
        keys.forEach(key => {
          categories.push({'key':[key],'value':res[key]});          
        });
         return categories;
      }));
  }

}
