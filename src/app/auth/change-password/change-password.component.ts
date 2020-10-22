import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('form') form : NgForm;
  errorMessage: string;
  constructor(
      private userService : UserService,
      private router : Router) { }

  ngOnInit() {
  }

  changingPassword(){
    var user = JSON.parse(localStorage.getItem('user'));
    var idToken = user._token;
    
    var password = this.form.value.changePassword;
    
    this.userService.changePassword(idToken,password)
        .subscribe(() =>{
          this.form.reset();
          this.router.navigate(['/']);
        },errorMessage =>{
          this.errorMessage = errorMessage;
        });
  }

}
