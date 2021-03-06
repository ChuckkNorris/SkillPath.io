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

  private _parentId: string;
  @Input() set parentId(value) {
    this._parentId = value;
    this.getCategories(value);
  }
  get parentId() { return this._parentId; }
  @Input() autoSelect: string;
  @Input() readonly: boolean = false;
  @Input() _selectedCategory: Category = {};
  @Output() selectedCategoryChange: EventEmitter<Category> = new EventEmitter<Category>();

  public categories: Category[] = [];
  @Output() onViewInitialized: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    if (this.tier == 1)
      this.getCategories();
    this.allCategory.tier = +this.tier;
  }

  ngAfterViewInit() {
    this.onViewInitialized.emit(true);

  }

  @ViewChild('categoryInput') input: any;
  public focus() {
    this.input.focus();
  }

  @Input() shouldGetEmptyCategories: boolean = false;
  public getCategories(parentCategoryId?: string, wasParentCategorySelected?: boolean) {
    let parentId = parentCategoryId || this.parentId;

    if (parentId) {
      this._categoryService.getChildCategories(parentId, this.shouldGetEmptyCategories).subscribe(categories => {
        this.trySelectCategories(categories);
      });
    }
    else if (this.tier == 1) {
      this._categoryService.getCategories(this.tier, this.shouldGetEmptyCategories).subscribe(categories => {
        this.trySelectCategories(categories);
      });
    }

  }

  isFirstInitialization: boolean = true;
  trySelectCategories(categories: Category[]) {
    this.categories = categories;
    if (this.selectedCategory && this.selectedCategory.id) {
      // Logic is just simpler this way
    }
    else {
      if (this.autoSelect)
        this.selectCategoryByName(this.autoSelect);
      // else if (this.isFirstInitialization) {
      //   this.selectAllCategory();
      // }
    }
    this.isFirstInitialization = false;
  }
  allCategory = {
    name: 'All',
    icon: "books",
    tier: +this.tier
  };
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
    let selectedCat = this.categories.find(cat => cat.name == categoryName);
    if (selectedCat) {
      this.selectedCategory = selectedCat;
      this.selectedCategoryChange.emit(this.selectedCategory);
      this.propogateChange(this.selectedCategory);
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
  isEmpty(o) {
    for (var i in o) {
      if (o.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }
  set selectedCategory(val) {
    this._selectedCategory = this.isEmpty(val) ? this.allCategory : val;
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
