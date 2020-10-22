import { UserService } from './services/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  options :OwlOptions = {
    loop : true,
    navSpeed : 1000,
    autoplay : true,
    items : 1
  }
  
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.autoLogin();
  }

  
}
