import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appStaggerGap]'
})
export class StaggerGapDirective {

  constructor(private flexElement: ElementRef) { }
  @Input() index: number;
  @Input() aboveElement: ElementRef;
  ngOnInit() {
   
   
  }

  ngAfterViewInit() {
     console.log(this.flexElement);
    console.log(this.index);
  //  this.setHeight();
     //this.flexElement.nativeElement.marginTop = this.getMarginTop();
     this.isOnNextRow();
  }

  

  getMarginTop() {
    let toReturn: number;
    if (this.isOnNextRow()) {
      toReturn = -(this.getTotalHeight(this.aboveElement)/2) - this.aboveElement.nativeElement.style.topMargin + this.aboveElement.nativeElement.style.botMargin;
    }
    return toReturn;
  }

  setHeight() {
    let firstChild = this.flexElement.nativeElement.children[0];
    // console.log(firstChild);
    if (firstChild.style.height) {
      // Set height to match content
      let firstChildTotalHeight = this.getTotalHeight(firstChild);
      console.log('My height is ' + this.flexElement.nativeElement.style.height);
      console.log('First Child height is: ' + firstChildTotalHeight);
      
      this.flexElement.nativeElement.style.height = firstChildTotalHeight;
    }
  }

  // 
  @HostListener('window:resize') onResize() {
    this.isOnNextRow();
  }

  getTotalHeight(element): number {
     return element.style.height + element.style.paddingTop + element.style.paddingBottom + 
        element.style.marginTop + element.style.marginBottom;
  }

  isOnNextRow(): boolean {
    let toReturn: boolean = false;
    // Get count of children in flex container
    // Get width of first child
    let styles = this.flexElement.nativeElement.style.cssText.split(';');
    let maxWidthPercent;
    styles.forEach(style => {
      let nameValue = style.split(':');
      if (nameValue[0].trim() == "max-width") {
        maxWidthPercent = (nameValue[1] as string).substring(0, nameValue[1].indexOf('%'));
      }
    });
    // 3
    let countPerRow = Math.floor(100 / parseFloat(maxWidthPercent));
    // 3
    toReturn = this.index >= countPerRow;
    console.log('Next Row? ' + toReturn);
    return toReturn;
  }

  

}
