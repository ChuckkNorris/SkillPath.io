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
  constructor(private _tutorialService: TutorialService) {}

  validate(c: AbstractControl) {
    return this.doesLinkExist(c.value).first(); 
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

}