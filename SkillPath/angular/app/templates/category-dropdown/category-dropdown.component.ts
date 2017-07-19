import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Category } from './../../models/category';
import { Component, OnInit, Input, forwardRef, SimpleChange } from '@angular/core';

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

  writeValue(category: any) {
    if (category)
      this.selectedCategory = category;
    else
      this._selectedCategory = category;
  }
  propogateChange = (_: any) => { };
  registerOnChange(fn) {
    this.propogateChange = fn;
  }
  registerOnTouched() { }

  private _selectedCategory: Category;
  @Input() set selectedCategory(category) {
    if (this._selectedCategory != category) {
      this._selectedCategory = category;
      this.propogateChange(this.selectedCategory);
    }
  }
  get selectedCategory() {
    if (this._selectedCategory && this._selectedCategory.id)
      return this._selectedCategory
    else return this.allCategory;
  }

  // - - INPUTS - - //

  @Input() autoSelect: string;
  @Input() disabled: boolean = false;
  @Input() title: string;

  private _categories: Category[];
  @Input('categories') set categories(categories) {
    if (categories)
      this._categories = categories;
  }

  get categories() { return this._categories; }


  // - - CONTROL EVENTS - - //

  private _showCategoryOptions: boolean = false;
  get showCategoryOptions(): boolean {
    return this._showCategoryOptions;
  }
  set showCategoryOptions(val: boolean) {
    setTimeout(() => {
      this._showCategoryOptions = val;
    }, 150)
  }

  // - - CONTROL DATA - - //

  get allCategory(): Category {
    return {
      name: 'All',
      icon: "books",
      description: "Show all tutorials in category"
    }
  };

}
