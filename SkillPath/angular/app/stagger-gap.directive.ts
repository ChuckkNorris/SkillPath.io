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
     console.log(this.flexElement);
    console.log(this.index);
    //this.setHeight();
     //this.flexElement.nativeElement.marginTop = this.getMarginTop();
     //this.isOnNextRow();
     setTimeout(() => {
      this.setMarginTop();
     }, 200);
     
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
    this.setMarginTop();
  }

  getTotalHeight(element): number {
    return element.offsetHeight;
    //  return element.style.height + element.style.paddingTop + element.style.paddingBottom + 
    //     element.style.marginTop + element.style.marginBottom;
  }

  setMarginTop() {
    // COUNT PER ROW: 3
    // ABOVE: row=2, column=2, index=4 
    // THIS: row=3, column=2, index=7
    let newMarginTop: number;
    if (this.isOnNextRow()) {
      let countPerRow = this.getItemCountPerRow();
      let parentIndex = this.index - countPerRow;
      let parentEl = this.flexElement.nativeElement.parentElement.children[parentIndex];
      
      var parentHeight = parentEl.offsetHeight;
      var parentCardHeight = parentEl.children[0].offsetHeight;
      var diff = parentHeight - parentCardHeight;
      console.log('index: ' + this.index + ', parentHeight: ' + parentHeight + ', parentIndex: ' + parentIndex);
      //newMarginTop = -(parentHeight/2) - 20;
      newMarginTop = -diff + 20
    }
    else 
      newMarginTop = 0;
    this.flexElement.nativeElement.style.marginTop = newMarginTop + "px";
  }

  // getFlexRowElement(index: number) : FlexRowElement {
     
  //   let toReturn: FlexRowElement = {};
  //   // 3 per row
  //   let countPerRow = this.getItemCountPerRow();
  //   // 2.66 = two rows before me exist and I'm the second one in my row (66% * 3)
  //   let rowIndexAndPercentOfCurrRow = this.index + 1 / countPerRow;
  //   toReturn.rowIndex = Math.floor(rowIndexAndPercentOfCurrRow);
  //   // aka nth item in row - 1
  //   toReturn.columnIndex = Math.round((rowIndexAndPercentOfCurrRow - toReturn.rowIndex) * countPerRow) - 1;
  //   return toReturn;
  // }

  //  getFlexRowElementByRow(rowIndex: number, somethingIndex: number) : FlexRowElement {
  //   let toReturn: FlexRowElement = {};
  //   // 3 per row
  //   let countPerRow = this.getItemCountPerRow();
  //   // 2.66 = two rows before me exist and I'm the second one in my row (66% * 3)
  //   let rowIndexAndPercentOfCurrRow = this.index + 1 / countPerRow;
  //   toReturn.rowIndex = Math.floor(rowIndexAndPercentOfCurrRow);
  //   // aka nth item in row - 1
  //   toReturn.columnIndex = Math.round((rowIndexAndPercentOfCurrRow - toReturn.rowIndex) * countPerRow) - 1;
  //   return toReturn;
  // }

  getItemCountPerRow() {
    let toReturn;
    let styles = this.flexElement.nativeElement.style.cssText.split(';');
    let maxWidthPercent = "1";
    styles.forEach(style => {
      let nameValue = style.split(':');
      if (nameValue[0].trim() == "max-width") {
        maxWidthPercent = (nameValue[1] as string).substring(0, nameValue[1].indexOf('%'));
      }
    });
     // 3
    toReturn = Math.floor(100 / parseFloat(maxWidthPercent));
    return toReturn;
  }

  isOnNextRow(): boolean {
    let toReturn: boolean = false;
    // Get count of children in flex container
    // Get width of first child
    // 3
    let countPerRow = this.getItemCountPerRow();
    // 3
    toReturn = this.index >= countPerRow;

    return toReturn;
  }

  

}
