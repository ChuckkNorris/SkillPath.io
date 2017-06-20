import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class LoaderService {
  public loaderSubscription: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  public show() {
    this.loaderSubscription.next(true);
  }

  public hide() {
    this.loaderSubscription.next(false);
  }

}
