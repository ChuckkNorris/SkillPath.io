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
    if (parentId) {
      this._categoryService.getChildCategories(parentId, this.shouldGetEmptyCategories).subscribe(categories => {
        this.setCategories(categories);
      });
    }
    else if (this.tier == 1) {
      this._categoryService.getCategories(this.tier, this.shouldGetEmptyCategories).subscribe(categories => {
        this.setCategories(categories);
      });
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
    //this.selectCategory(undefined, -1);
  }

  isFirstInitialization: boolean = true;
  setCategories(categories: Category[]) {
    this.categories = categories;
    console.log(this.selectedCategory);
    // if (this.selectCategory)
    //   this.selectCategory(this.selectedCategory.id);
    if (this.autoSelect)
      this.selectCategoryByName(this.autoSelect);
    else if (this.isFirstInitialization && !this.selectedCategory.id) {
      this.selectAllCategory();
      this.isFirstInitialization = false;
    }
  }

  private filteredCategories: Category[];

  isFocused: boolean = false;
  onFocused() {
    if (!this.readonly)
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

  selectCategoryByName(categoryName: string) {
    let selectedCat = this.categories.find(cat => cat.name == categoryName);;
    if (selectedCat) {
      this.selectedCategory = selectedCat;
      this.selectedCategoryChange.emit(this.selectedCategory);
      this.onBlur();
    }
  }

  selectCategory(selectedCategoryId: string, index?: number) {
    this.selectedCategoryIndex = index;
    let selectedCat = this.categories.find((cat, catIndex) => cat.id == selectedCategoryId || catIndex == index);
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
