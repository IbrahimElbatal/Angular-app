import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http';
import { CarouselModule} from 'ngx-owl-carousel-o'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CompareValidatorDirective } from './validators/compare-validator.directive';
import { AppRouting } from './app-routing.module';
import { NavbarDirectiveDirective } from './directives/navbar-directive.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CompareValidatorDirective,
    NavbarDirectiveDirective
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRouting,
    CarouselModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
