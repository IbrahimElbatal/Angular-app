import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNavShow]'
})
export class NavbarDirectiveDirective {

  constructor(private ref : ElementRef) { }
  
  @HostListener('click') toggleShow(){
    var element  = this.ref.nativeElement.nextElementSibling;
    element.classList.toggle('show');
  }

}
