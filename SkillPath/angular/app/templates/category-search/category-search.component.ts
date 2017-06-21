import { Observable } from 'rxjs/Observable';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/Rx';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent implements OnInit {

  constructor(private _categoryService: CategoryService) { 
    //super();
    //  if (this.parentId) {
    //   this._categoryService.getChildCategories(this.parentId).subscribe(categories => this.categories = categories);
    // }
    // else if (this.tier == 1) {
    //   this._categoryService.getCategories(this.tier).subscribe(categories => this.categories = categories);
    // }
  }
  @Input() title: string;
  @Input() public tier: number;
  @Input() parentId: string;

  @Input() selectedCategory: Category = {};
  @Output() selectedCategoryChange: EventEmitter<Category> = new EventEmitter<Category>();
  public categories: Category[] = [];
  
  @Output() onViewInitialized: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
     this.getCategories();
    
  }

  ngAfterViewInit() {
    
    this.onViewInitialized.emit(true);
    //this.input.nativeElement.focus();
  }

  @ViewChild('categoryInput') input: any;
  public focus() {
    this.input.focus();
  }

  @Input() shouldGetEmptyCategories: boolean = false;
  public getCategories(parentCategoryId?: string) {
    console.log('INitializing category search')
    let parentId = parentCategoryId || this.parentId;
    console.log('Categories: ' + this.shouldGetEmptyCategories);
    if (parentId) {
      if (this.shouldGetEmptyCategories) {
        this._categoryService.getChildCategories(parentId, true).subscribe(categories => this.setCategories(categories));
      }
      else {
        this._categoryService.getChildCategories(parentId).subscribe(categories => this.setCategories(categories));
      }
    }
    else if (this.tier == 1) {
      if (this.shouldGetEmptyCategories) {
        this._categoryService.getCategories(this.tier, true).subscribe(categories => this.setCategories(categories));
      }
      else {
        this._categoryService.getCategories(this.tier).subscribe(categories => this.setCategories(categories));
      }
      
    }
  }

  setCategories(categories: Category[]) {
    let categoriesWithIcons = [];
    categories.forEach(cat => {
      cat.iconClasses = [];
      if (cat.icon)
        cat.iconClasses = cat.icon.split('.');
      categoriesWithIcons.push(cat);
    });
    this.categories = categoriesWithIcons;
  }

  private filteredCategories: Category[];

  isFocused: boolean = false;
  onFocused() {
     this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  filterCategories(searchText: any) {

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
    }, 200);
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
