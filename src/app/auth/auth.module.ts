import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from '../authGuard.service';
import { ForegetPasswordComponent } from './foreget-password/foreget-password.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes:Routes =[

    {
        component : LoginComponent ,
         path : ""
    },
    {component : RegisterComponent , path : "register"},
    {component : CheckEmailComponent , path : "check-email"},
    {component : ChangePasswordComponent , path : "change-password",canActivate :[AuthGuard]},
    {component : ForegetPasswordComponent , path : "forget-password"}
];

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ChangePasswordComponent,
        ForegetPasswordComponent,
        CheckEmailComponent
      ],
    imports:[
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule
    ],
    exports:[
        RouterModule
    ]
})
export class AuthModule{

}