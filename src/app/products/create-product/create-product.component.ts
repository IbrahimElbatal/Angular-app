import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product.class';
import { Category } from 'src/app/models/category.class';
import { ProductService } from 'src/app/services/product-service.service';
import { CategoryService } from 'src/app/services/category-service.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  @ViewChild('productForm') productForm :NgForm;
  private id : string = this._route.snapshot.paramMap.get('id'); 
  
  product : Product = new Product();
  categories : Category[] = new Array<Category>();
  
  constructor(public productService : ProductService,
              private categoryService : CategoryService,
              private _router : Router ,
              private _route  : ActivatedRoute) { 
  }
  
  ngOnInit() {
    this.categoryService.getAll()
      .subscribe((categories : Category[]) => this.categories = categories);
   
    if(this.id)
      this.getProduct(this.id);
  }

  saveProduct(){
    let product : Product = new Product({...this.product});
    product.id = null;
    if(this.id == "0")
    {
      this.productService.create(product)
        .subscribe(() =>{
          console.log("added");
          this._router.navigate(['/products']);
        });
    }
    else{
      this.productService.update(this.id,product)
        .subscribe(() => {
          this._router.navigate(['products'])
        });
    }
    this.productForm.reset();
  }

  getProduct(id : string)  {
    this.productService.get(id)
      .subscribe((p : Product)=> this.product = p);
     
  }

  deleteProduct(){
    this.productService.delete(this.product.id)
      .subscribe(()=> this._router.navigate(['products']) );
  }
}
