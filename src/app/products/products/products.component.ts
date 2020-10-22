import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.class';
import { ProductService } from 'src/app/services/product-service.service';
import { Category } from 'src/app/models/category.class';
import { CategoryService } from 'src/app/services/category-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  categories: Category[] = [];
  products: Product[] = [];
  productsByCategory: Product[] = [];
  categoryKey: string;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private route: ActivatedRoute
              ) {

    this.categoryService.getAll()
      .subscribe((categories) => this.categories = categories);

    this.productService.getAll()
      .pipe(switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      }))
      .subscribe((param: ParamMap) => {
        this.categoryKey = param.get('categoryKey');
        this.productsByCategory = (this.categoryKey != null) ?
          this.products.filter(product => product.categoryKey === this.categoryKey) :
          this.products;
      });
  }
}
