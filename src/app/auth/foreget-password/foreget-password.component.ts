import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-foreget-password',
  templateUrl: './foreget-password.component.html',
  styleUrls: ['./foreget-password.component.css']
})
export class ForegetPasswordComponent implements OnInit {

  @ViewChild('form') forgetForm :NgForm;
  errorMessage :string;

  constructor(
      private userService: UserService,
      private router : Router) { }

  ngOnInit() {
  }

  forgettingPassword(){
    var email =this.forgetForm.value.email;
    this.userService.foregetPassword(email)
      .subscribe(()=>{
        this.router.navigate(['/auth/check-email']);
      },
      errorMessage =>{
        this.errorMessage =errorMessage}
      );
  }
}
