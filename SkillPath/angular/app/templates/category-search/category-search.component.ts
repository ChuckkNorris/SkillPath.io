import { Observable } from 'rxjs/Observable';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, forwardRef } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from "@angular/forms";


export function validateCategorySearch(c: FormControl) {
  let err = {
          requiredError: {
            given: c.value,
          }
        };

        return c.value == null || c.value == undefined ? err : null;
}

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
     // useValue: validateCategorySearch,
      useExisting: forwardRef(() => CategorySearchComponent),
      multi: true
    }
  ]
})
export class CategorySearchComponent implements OnInit, ControlValueAccessor {

  constructor(private _categoryService: CategoryService)  { 
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

  @Input() _selectedCategory: Category = {};
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
    let parentId = parentCategoryId || this.parentId;
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
    // let categoriesWithIcons = [];
    // categories.forEach(cat => {
    //   cat.iconClasses = [];
    //   if (cat.icon)
    //     cat.iconClasses = cat.icon.split('.');
    //   categoriesWithIcons.push(cat);
    // });
    this.categories = categories;
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
     this.selectedCategoryIndex = index;
     //Observable.from(this.categories).filter(x => x.filter)
     //this.selectedCategory = 
     this.categories.forEach((cat, catIndex) => {
       if (cat.id == selectedCategoryId || index == catIndex) {
        this.selectedCategory = cat;
        this.selectedCategoryChange.emit(this.selectedCategory);
        //this.propogateChange(this.selectedCategory);
        this.onBlur();
       }
      });
   }

  set selectedCategory(val) {
    this._selectedCategory = val;
    this.propogateChange(this.selectedCategory);
  }

  get selectedCategory() {
     return this._selectedCategory;
  }

   writeValue(value: any) {
     this.selectedCategory = value;
   }

   propogateChange = (_: any) => {};

   registerOnChange(fn) {
     this.propogateChange = fn;
   }

   registerOnTouched() {}
  
}
