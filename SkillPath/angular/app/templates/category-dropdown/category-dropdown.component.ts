import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class CategoryDropdownComponent implements OnInit {

  constructor() { }
  @Input() title: string;
  private _selectedCategory:Category;
  @Input() set selectedCategory(val) {
    this._selectedCategory = val;
  }
  get selectedCategory() {
    return this._selectedCategory;
  }

  private _categories: Category[] = [];
  @Input() set categories(val) {this._categories = val;}
  get categories() {return this._categories;}

  ngOnInit() {
  }

}
