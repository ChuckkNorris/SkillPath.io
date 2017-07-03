import { FlexRowElement } from './stagger-gap.directive';
import { Directive, ElementRef, Input, HostListener } from '@angular/core';

export interface FlexRowElement {
  index?: number;
  rowIndex?: number;
  columnIndex?: number;
}

@Directive({
  selector: '[appStaggerGap]'
})
export class StaggerGapDirective {

  constructor(private flexElement: ElementRef) { }
  @Input() index: number;
  @Input() aboveElement: ElementRef;

  ngAfterViewInit() {
     setTimeout(() => {
      this.setMarginTop();
     }, 200);
  }

  @HostListener('window:resize') onResize() {
    this.setMarginTop();
  }

  setMarginTop() {
    // COUNT PER ROW: 3
    // ABOVE: row=2, column=2, index=4 
    // THIS: row=3, column=2, index=7
    let newMarginTop: number;
    if (this.isOnNextRow()) {
      let countPerRow = this.getItemCountPerRow();
      let parentIndex = this.index - countPerRow;
      let parent = this.flexElement.nativeElement.parentElement;
      if (parent && parent.children) {
        let parentEl = parent.children[parentIndex];
      
        let parentHeight = parentEl.offsetHeight;
        let parentCardHeight = parentEl.children[0].offsetHeight;
        let diff = parentHeight - parentCardHeight;
        //newMarginTop = -(parentHeight/2) - 20;
        newMarginTop = -diff + 20;
      }
    }
    else 
      newMarginTop = 0;
    this.flexElement.nativeElement.style.marginTop = newMarginTop + "px";
  }

  getItemCountPerRow() {
    let toReturn;
     let maxWidthPercentStyle = this.flexElement.nativeElement.style.maxWidth;
     let maxWidth = maxWidthPercentStyle.substring(0, maxWidthPercentStyle.indexOf('%'));
    toReturn = Math.floor(100 / parseFloat(maxWidth));
    return toReturn;
  }

  isOnNextRow(): boolean {
    let toReturn: boolean = false;
    let countPerRow = this.getItemCountPerRow();
    toReturn = this.index >= countPerRow;
    return toReturn;
  }

}
