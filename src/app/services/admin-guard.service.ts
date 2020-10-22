import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {
  constructor(private userService : UserService, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let email = localStorage.getItem("email");
    
    return this.userService.IsAdmin(email)
      .pipe(map(res=> res));
 }}
