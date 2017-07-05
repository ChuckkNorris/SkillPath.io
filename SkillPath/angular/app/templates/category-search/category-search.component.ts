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

  constructor(private _categoryService: CategoryService) { }
  @Input() title: string;
  @Input() public tier: number;
  @Input() parentId: string;
  @Input() autoSelect: string;
  @Input() readonly: boolean = false;
  @Input() _selectedCategory: Category = {};
  @Output() selectedCategoryChange: EventEmitter<Category> = new EventEmitter<Category>();

  public categories: Category[] = [];
  @Output() onViewInitialized: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.onViewInitialized.emit(true);
    this.getCategories();
  }

  @ViewChild('categoryInput') input: any;
  public focus() {
    this.input.focus();
  }

  @Input() shouldGetEmptyCategories: boolean = false;
  public getCategories(parentCategoryId?: string) {
    let parentId = parentCategoryId || this.parentId;
    console.log('getting category' + parentId + ', with tier: ' + this.tier);
    if (parentId) {
      this._categoryService.getChildCategories(parentId, this.shouldGetEmptyCategories).subscribe(categories => {
        this.initializeCategorySearch(categories);
      });
    }
    else if (this.tier == 1) {
      this._categoryService.getCategories(this.tier, this.shouldGetEmptyCategories).subscribe(categories => {
        this.initializeCategorySearch(categories);
      });
    }

  }

  isFirstInitialization: boolean = true;
  initializeCategorySearch(categories: Category[]) {
    this.categories = categories;
    // TODO: FIGURE OUT WHY CATEGORY parentId AND tier are undefined
    if (this.selectedCategory && this.selectedCategory.id) {
      // Logic is just simpler this way
    }
    else {
      if (this.autoSelect)
        this.selectCategoryByName(this.autoSelect);
      else if (this.isFirstInitialization) {
        this.selectAllCategory();
        this.isFirstInitialization = false;
      }
    }
  }

  selectAllCategory() {
    this.selectedCategory = {
      name: 'All',
      icon: "books",
      tier: parseInt(this.tier.toString())
    };
    this.selectedCategoryChange.emit(this.selectedCategory);
    this.onBlur();
  }


  isFocused: boolean = false;
  onFocused() {
    if (!this.readonly)
      this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  waitForComplete() {
    setTimeout(() => {
      this.onBlur();
    }, 200);
  }

  selectCategoryByName(categoryName: string) {
    let selectedCat = this.categories.find(cat => cat.name == categoryName);;
    if (selectedCat) {
      this.selectedCategory = selectedCat;
      this.selectedCategoryChange.emit(this.selectedCategory);
      this.onBlur();
    }
  }

  selectCategory(selectedCategoryId: string) {
    let selectedCat = this.categories.find((cat, catIndex) => cat.id == selectedCategoryId);
    if (selectedCat)
      this.selectedCategory = selectedCat;
    else
      this.selectedCategory = { tier: parseInt(this.tier.toString()) };
    this.selectedCategoryChange.emit(this.selectedCategory);
    this.onBlur();
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

  propogateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propogateChange = fn;
  }

  registerOnTouched() { }

}
