import {Directive, HostListener, HostBinding, ElementRef ,Renderer2} from '@angular/core';


@Directive({
    selector:'[appHide]'
})

export class appHideDirective{
    
    // none
    isOpen=false;
    

    constructor(elem: ElementRef, renderer: Renderer2){

            console.log(elem);
            //for modal
            renderer.setStyle(elem.nativeElement,'display','none'); 
    }
  
}