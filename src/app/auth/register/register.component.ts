import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: string;

  constructor(public userService : UserService ,
              private router : Router) { }


  ngOnInit() {
  }

  onSubmit(form){
    this.userService.Register(form.value)
     .subscribe(() => {
       this.router.navigate(["/"]);
     },errorMessage=>{
       this.errorMessage = errorMessage;
     });   
  }
}
