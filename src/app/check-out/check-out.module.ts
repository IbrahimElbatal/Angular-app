import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckOutComponent } from './check-out.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../authGuard.service';


@NgModule({
  declarations: [
    CheckOutComponent,
  ],
  imports: [
    RouterModule.forChild([
        {
          component : CheckOutComponent ,
          path : "",
          canActivate :[AuthGuard]},
      ]),
    FormsModule, //
    HttpClientModule,
    CommonModule
  ],
  exports :[RouterModule]
})
export class CheckOutModule { }
