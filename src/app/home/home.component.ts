import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  options:OwlOptions = {
    loop:true,
    items : 1,
    dots : true,
    navSpeed : 1000,
    autoplay : true,
    nav : true 
  }
  constructor(){

  }  

}
