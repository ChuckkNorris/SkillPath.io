import { Observable } from 'rxjs';
import { TutorialService } from './../services/tutorial.service';
import { Directive } from '@angular/core';
import { ValidatorFn, NG_VALIDATORS, Validator, FormControl, AbstractControl, NG_ASYNC_VALIDATORS } from "@angular/forms";



@Directive({
  selector: '[tutorialLinkExists][ngModel]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: TutorialLinkExists, multi: true }
  ]
})
export class TutorialLinkExists implements Validator {
  //validator: ValidatorFn;
  constructor(private _tutorialService: TutorialService) {
   //this.validator = this.doesLinkExist();
  }

  validate(c: AbstractControl) {
    console.log(c.value);
    return this.doesLinkExist(c.value).first();  //this.validator(c.value);
  }

  doesLinkExist(tutorialLinkUrl: string) {
    let err = {
        tutorialExists: true
    };
    return Observable.create(obs => {
       this._tutorialService.doesTutorialExist(tutorialLinkUrl).subscribe(doesTutExist => {
         if (doesTutExist) {
            obs.next(err);
         }
         else {
           obs.next(null);
         }
      });
    });
  }

  // doesLinkExist2(): ValidatorFn {
  //   return (c: AbstractControl) => {
     
  //     console.log(c.value);
  //     if (c.value && c.value.id)
  //       return null;
  //     else
  //       return err;
  //   }
  // }


}