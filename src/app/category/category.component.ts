import { Category } from './../models/category.class';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input('categoryKey') categoryKey : string;
  @Input('categories') categories : Category[];
  constructor() { }

  ngOnInit() {
  }

}
