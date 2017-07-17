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
    if (category != this._selectedCategory)
      this._selectedCategory = category;
  }
  propogateChange = (_: any) => { };
  registerOnChange(fn) {
    this.propogateChange = fn;
  }
  registerOnTouched() { }

  // - - INPUTS - - //

  @Input() autoSelect: string;
  @Input() disabled: boolean = false;
  @Input() title: string;

  private _selectedCategory: Category;
  @Input() set selectedCategory(category) {
    if (this._selectedCategory != category) {
      this._selectedCategory = category;
      this.propogateChange(this.selectedCategory);
    }
  }
  get selectedCategory() {
    return this._selectedCategory || this.allCategory;
  }

  private _categories: Category[];
  @Input('categories') set categories(categories) {
    console.log('Categories Received for ' + this.title);
    this._categories = categories;
    let autoSelectCategory = this.getCategoryByName(this.autoSelect);
    if (autoSelectCategory) {
      this._selectedCategory = autoSelectCategory;
      this.propogateChange(this._selectedCategory);
    }
  }

  get categories() {
    return this._categories;
  }

  // - - CONTROL METHODS - - //
  getCategoryByName(categoryName: string) : Category {
    let selectedCat;
    if (this.categories && this.autoSelect) {
      selectedCat = this.categories.find(cat => cat.name == categoryName);
    }
    return selectedCat;
  }

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
