import { switchMap, take } from 'rxjs/operators';
import { UserService } from './user.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private userService : UserService) {
    }

    intercept(req:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

       return this.userService.user
            .pipe(
                take(1),
                switchMap(user =>{
                    if(!user){
                        return next.handle(req);
                    }
                    else{
                        var request = req.clone(
                                {params : new HttpParams().set("auth",user.token)}
                            );
                            return next.handle(request);
                    }       
                })
            );       
    }
}