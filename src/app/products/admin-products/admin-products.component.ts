import { DataTableResource } from 'angular5-data-table';
import { ProductService } from './../../services/product-service.service';
import { Product } from './../../models/product.class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  searchTerm :string;
  products : Product[] = [];
  filteredProducts : Product[] =[];

  dataTableResource : DataTableResource<Product>;
  items:Product[] =[];
  itemCount:number;

  constructor(
    private productService : ProductService
    ){}  
  
  ngOnInit(): void {
    this.productService.getAll()
      .subscribe((products:Product[])=>{
        this.filteredProducts = this.products =products;
        this.InitializeDataTableResource(products);
      });
  }

  private InitializeDataTableResource(products:Product[]) {
    this.dataTableResource = new DataTableResource(products);

    this.dataTableResource.query({offset :0})
      .then(items=>this.items = items);

    this.dataTableResource.count()
      .then(count => this.itemCount = count);  
  }

  reloadProducts(params){
    if(!this.dataTableResource) return;

    return this.dataTableResource.query(params)
      .then(items=>this.items = items);
  }

  filterProducts(){
    this.filteredProducts = this.products
      .filter(product => {
          return product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      });    
      this.InitializeDataTableResource(this.filteredProducts);
  }
}
