import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmailConfirmation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailConfirmationDirective), multi: true }
]
})
export class EmailConfirmationDirective {

  constructor( @Attribute('validateEqual') public validateEqual: string) {}

  validate(c: AbstractControl): { [key: string]: any } {
    // self value (e.g. retype password)
    let v = c.value;

    // control value (e.g. password)
    let e = c.root.get(this.validateEqual);

    // value not equal
    if (e && v !== e.value) return {
        validateEqual: false
    }
    return null;
}

}
