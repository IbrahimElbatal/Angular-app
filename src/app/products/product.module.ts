import { CardComponent } from './../card/card.component';
import { CategoryComponent } from './../category/category.component';
import { DataTableModule } from 'angular5-data-table';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { AuthGuard } from '../authGuard.service';

const routes :Routes =[

    {
        component : ProductsComponent ,
        path : "",
    },
    {component : CreateProductComponent , path : "create/:id"}, 
    {component : AdminProductsComponent , path : "admin",canActivate :[AuthGuard]}
];
@NgModule({
    declarations: [
        ProductsComponent,
        AdminProductsComponent,
        CreateProductComponent,
        CategoryComponent,
        CardComponent
      ],
    imports:[
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        DataTableModule.forRoot()
    ]
})
export class ProductModule{

}