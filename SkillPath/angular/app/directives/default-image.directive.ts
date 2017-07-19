import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'img[default]',
  host: {
    '(error)':'updateUrl($event)',
    '[src]':'src'
   }
})
export class DefaultImageDirective {
  @Input() src:string;
  @Input() default:string;

  updateUrl(event) {
    //console.log(event);
    this.src = this.default;
    event.preventDefault();
  }

}
