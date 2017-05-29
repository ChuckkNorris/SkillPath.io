import { Observable } from 'rxjs/Observable';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/Rx';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent implements OnInit {

  constructor(private _categoryService: CategoryService) { }
  @Input() title: string;
  @Input() tier: number;
  @Input() parentId: string;

  @Input() selectedCategory: Category = {};
  @Output() selectedCategoryChange: EventEmitter<Category> = new EventEmitter<Category>();
  private categories: Category[] = [];
  ngOnInit() {
    console.log('cat service: ' + this.parentId);
    if (this.parentId) {
      this._categoryService.getChildCategories(this.parentId).subscribe(categories => this.categories = categories);
    }
    else {
      this._categoryService.getCategories(this.tier).subscribe(categories => this.categories = categories);
    }
  }

  private filteredCategories: Category[];

  onSelectedCategoryChanged() {
    
  }
  isFocused: boolean = false;
  onFocused() {
     this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }


  selectedCategoryIndex: number = 0;
  selectCategoryArrow(direction) {
    if (direction == 'up') {
      if (this.selectedCategoryIndex > 0)
        this.selectedCategoryIndex--;
    }
    else if (direction == 'down') {
      if (this.selectedCategoryIndex < this.categories.length - 1)
        this.selectedCategoryIndex++;
    }
  }

  waitForComplete() {
    setTimeout(() => {
      this.onBlur();
    }, 100);
  }

   selectCategory(selectedCategoryId: string, index: number) {

     console.log(selectedCategoryId);
     this.selectedCategoryIndex = index;
     //Observable.from(this.categories).filter(x => x.filter)
     //this.selectedCategory = 
     this.categories.forEach((cat, catIndex) => {
       if (cat.id == selectedCategoryId || index == catIndex) {
        this.selectedCategory = cat;
        this.selectedCategoryChange.emit(this.selectedCategory);
        this.onBlur();
       }
      });
   }
  
}
