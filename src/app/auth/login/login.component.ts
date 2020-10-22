import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserResponse } from 'src/app/models/userResponse.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isAdmin : boolean;
  errorMessage: any;

  constructor(
    public userService : UserService ,
    private router : Router,
    private route:ActivatedRoute 
    ) { }

  ngOnInit() {
  }

 onSubmit(form){
  let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
  
  this.userService.Login(form.value)
    .subscribe((response: UserResponse) => {
      if(response)
      {
        if(returnUrl)
          this.router.navigateByUrl(returnUrl);
        else
          this.router.navigate(["/"]);  

      }
    },errorMessage =>{
      this.errorMessage = errorMessage;
    });   
 }
}
