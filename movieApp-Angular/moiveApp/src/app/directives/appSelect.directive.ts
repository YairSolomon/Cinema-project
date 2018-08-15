import {Directive , HostBinding, HostListener, ElementRef} from '@angular/core';


@Directive({
    selector:'[appSelect]'
})

export class appSelectDirective{

    @HostBinding('attr.submitButton') button:ElementRef;

    @HostListener('modal') SubmitForm(){
      this.button.nativeElement.hide();
    }
    
  
}