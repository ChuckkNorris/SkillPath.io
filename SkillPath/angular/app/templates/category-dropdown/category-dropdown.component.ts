import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Category } from './../../models/category';
import { Component, OnInit, Input, forwardRef } from '@angular/core';

@Component({
  selector: 'app-category-dropdown',
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.scss'],
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // useValue: validateCategorySearch,
      useExisting: forwardRef(() => CategoryDropdownComponent),
      multi: true
    }
  ]
})
export class CategoryDropdownComponent implements ControlValueAccessor {

  // - - NG MODEL - - //

  writeValue(value: any) {
    this.selectedCategory = value;
  }
  propogateChange = (_: any) => { };
  registerOnChange(fn) {
    this.propogateChange = fn;
  }
  registerOnTouched() { }

  // - - INPUTS - - //

  @Input() autoSelect: string;
  @Input() readonly: boolean = false;
  @Input() title: string;

  private _selectedCategory:Category;
  @Input() set selectedCategory(val) {
    this._selectedCategory = val;
    this.propogateChange(this.selectedCategory);
  }
  get selectedCategory() {
    return this._selectedCategory || this.allCategory;
  }

  private _categories: Category[] = [];
  @Input('categories') set categories(categories) {
    this._categories = categories;// [this.allCategory].concat(categories);
   
  }
  get categories() {
    return this._categories;
  }

  // - - CONTROL EVENTS - - //

  private _showCategoryOptions: boolean = false;
  get showCategoryOptions() : boolean {
    return this._showCategoryOptions;
  }
  set showCategoryOptions(val: boolean) {
      setTimeout(() => {
        this._showCategoryOptions = val;
      }, 100)
  }

  forceSelectCategory(category) {
    console.log(category);
    this.selectedCategory = category;
  }

  // - - CONTROL DATA - - //
  
  get allCategory() : Category {
   return { name: 'All',
    icon: "books",
    description: "Show all tutorials in category"
    }
  };

}
