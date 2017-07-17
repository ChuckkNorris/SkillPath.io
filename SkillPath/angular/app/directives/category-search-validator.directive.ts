import { Directive } from '@angular/core';
import { ValidatorFn, NG_VALIDATORS, Validator, FormControl, AbstractControl } from "@angular/forms";



@Directive({
  selector: '[categorySearchRequired][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CategorySearchRequired, multi: true }
  ]
})
export class CategorySearchRequired implements Validator {
  validator: ValidatorFn;
  constructor() {
    this.validator = this.validateDropdown();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  validateDropdown(): ValidatorFn {
    return (c: AbstractControl) => {
      let err = {
        emptyError: {
          message: 'Cannot be empty'
        }
      };
      if (c.value && c.value.id)
        return null;
      else
        return err;
    }
  }


}