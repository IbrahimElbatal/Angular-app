import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
      private userService : UserService, 
      private router:Router
      ) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot){
     
    return this.userService.user.pipe(
      map(user =>{
        if(user){
          return true;
        }
        else{
          this.router.navigate(
                ["login"],
                {queryParams:{returnUrl : state.url}}
            );
          return false;
        }
      })
    );
  }
}
