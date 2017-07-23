import { NgForm, NgModel, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Input, ViewChildren, QueryList, EventEmitter, Output, forwardRef } from '@angular/core';

@Component({
  selector: 'app-category-dropdown-list',
  templateUrl: './category-dropdown-list.component.html',
  styleUrls: ['./category-dropdown-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // useValue: validateCategorySearch,
      useExisting: forwardRef(() => CategoryDropdownListComponent),
      multi: true
    }
  ]
})
export class CategoryDropdownListComponent implements OnInit, ControlValueAccessor {

  constructor(private _categoryService: CategoryService, private tutorialForm: NgForm) { }

  // - - NG MODEL - - //

  writeValue(newCategories: any) {
    //if (newCategories && newCategories != this._selectedCategories)
    this.selectedCategories = newCategories;
  }
  propogateChange = (_: any) => { };
  registerOnChange(fn) {
    this.propogateChange = fn;
  }
  registerOnTouched() { }

  @Input() showEmptyCategories: boolean = false;

  private _selectedCategories: Category[] = [];
  @Input() set selectedCategories(newCategories) {
    if (newCategories && this._selectedCategories != newCategories) {
      this._selectedCategories = newCategories;
      this.propogateChange(this._selectedCategories);
    }
  }
  get selectedCategories() {
    return this._selectedCategories;
  }

  // - - Categories - - //

  t1Categories: Category[];
  t2Categories: Category[];
  t3Categories: Category[];
  t4Categories: Category[];

  // - - Initialization
  @ViewChildren(NgModel) controls: QueryList<NgModel>;
  ngAfterViewInit() {
    this.controls.forEach((control: NgModel) => {
      this.tutorialForm.addControl(control);
    });
  }

  ngOnInit() {
    this.getCategories(1);
  }

  getCategories(tier: number) {
    this._categoryService.getCategories(tier, this.showEmptyCategories).subscribe(cats => {
      this.t1Categories = cats;
      this.autoSelectCategory(tier)
    });
  }

  onCategoryChanged(tier: number, category: Category) {
    this.deselectChildCategories(+tier);
    let newCategoriesList = this.selectedCategories != null ? this.selectedCategories.slice() : [];
    newCategoriesList[+tier - 1] = category;
    this.selectedCategories = newCategoriesList;
    if (tier && category.tier)
      this.getChildCategories(+tier + 1, category.id);
  }

  getChildCategories(tier: number, parentId: string) {
    if (parentId && tier < 5) {
      this._categoryService.getChildCategories(parentId, this.showEmptyCategories).subscribe(cats => {
        // Bug here:
        // After switching t1 categories, t3CategoryDropdown set categegories() isn't being
        // triggered - can't figure out why. $10 PayPal bounty?
        let categoryName = 't' + tier + 'Categories';
        this[categoryName] = cats;
        this.autoSelectCategory(tier);
      });
    }
  }

  autoSelectCategory(tier: number) {
    if (this._selectedCategories.filter(cat => cat).length != 4) {
      let index = +tier - 1;
      let autoSelectCategoryNames = ['Frontend', 'Web Frameworks', 'Angular 2.x+'];

      let catName = autoSelectCategoryNames[index];
      let matchCat = this[`t${tier}Categories`].filter(cat => cat.name == catName);
      if (matchCat.length > 0) {
        this.selectedCategories[index] = matchCat[0];

      }
    }
  }


  deselectChildCategories(tier: number) {
    if (tier <= 2) {
      this._selectedCategories[1] = undefined;
    }
    if (tier <= 3) {
      this._selectedCategories[2] = undefined;
    }
    if (tier <= 4) {
      this._selectedCategories[3] = undefined;
    }
  }

}
