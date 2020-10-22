import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { UserResponse } from './../models/userResponse.model';
import { User } from './../models/user.model';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;
  isAdmin: Object;

  private url :string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp"

  constructor(
      private http : HttpClient,
      private router:Router) {
   }

  Register(user : {name:string, email : string ,password : string ,returnSecureToken : boolean}){
    return this.http.post(this.url,{
      email : user.email,
      password : user.password,
      returnSecureToken : true
    },{
      params : new HttpParams().set('key',environment.firebaseKey)
    }).pipe(
      tap((response:UserResponse)=>this.notifyUser(response)),
      switchMap((response:UserResponse) =>{
        var url = 'https://store-f97a3.firebaseio.com/users.json';
        return this.http.post(url,{
          name : user.name,
          userId : response.localId
        });
      }),
      catchError(error=>this.handleAuthonticationError(error))
    );
  }

  Login(user){
    this.url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
 
    return this.http.post(this.url,{
      email : user.email,
      password : user.password,
      returnSecureToken : true
    },{
      params : new HttpParams().set('key',environment.firebaseKey)
    }).pipe(
      catchError(error =>this.handleAuthonticationError(error)),
      tap((response:UserResponse)=>this.notifyUser(response))
    );
  }
  
  autoLogin(){
    var loadedUser : {
      id:string,
      email :string,
      _token:string,
      _expirationDate:string
    } = JSON.parse(localStorage.getItem('user'));

    if(!loadedUser)
      return;

    var user = User.createUser(loadedUser);
    if(!user ||!user.token)
      return;
    this.user.next(user);
    this.autoLogout(user.expiresIn);
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationTime : number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    },expirationTime);
  }

  private notifyUser(response:UserResponse){
    var expirationDate = new Date(new Date().getTime() + Number(response.expiresIn) *1000);

    var user = new User(
        response.email,
        response.localId,
        response.idToken,
        expirationDate
      );
    this.user.next(user);
    this.autoLogout(user.expiresIn);
    localStorage.setItem('user',JSON.stringify(user));
  }
  private handleAuthonticationError(errorResponse){
    let errorMessage = "UnKnown Error Occured!";
    if(!errorResponse.error || !errorResponse.error.error)
      return throwError(errorMessage);

    switch(errorResponse.error.error.message){
      case "EMAIL_EXISTS":
        errorMessage = "Email is Taken Add another Email";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessage = "Please Try Later";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Email Not Found ,add corect email";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Password is incorrect";
        break;      
        case "INVALID_ID_TOKEN" :
          errorMessage = "invalid token please,login again.";
        break;
        case "EMAIL_NOT_FOUND":
          errorMessage = "The provided email is not valid."
        break;
    }

    return throwError(errorMessage);
  }

  changePassword(idToken ,password){
    var url  = "https://identitytoolkit.googleapis.com/v1/accounts:update";
    
    return this.http.post(url,{
      idToken :idToken,
      password :password,
      returnSecureToken : true
    },{
      params : new HttpParams().set('key',environment.firebaseKey)
    }).pipe(
      catchError(err =>this.handleAuthonticationError)
    );
  }
  foregetPassword(email){
    var url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode";
    return this.http.post(url,{
      email :email,
      requestType : "PASSWORD_RESET"
    },{
      params : new HttpParams().set("key",environment.firebaseKey)
    }).pipe(
      catchError(error=>this.handleAuthonticationError(error))
    )
  }



  IsAdmin(email){
    var userEmail = JSON.parse(localStorage.getItem('user')).email;
    return this.http.get(this.url+"isAdmin?email="+(userEmail ||email))
        .pipe(map(admin=>this.isAdmin =admin));
   }
}
