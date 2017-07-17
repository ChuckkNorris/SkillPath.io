import { NgForm, NgModel } from '@angular/forms';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Input, ViewChildren, QueryList, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category-dropdown-list',
  templateUrl: './category-dropdown-list.component.html',
  styleUrls: ['./category-dropdown-list.component.css']
})
export class CategoryDropdownListComponent implements OnInit {

  constructor(private _categoryService: CategoryService, private tutorialForm: NgForm) { }
  
  @Input() showEmptyCategories: boolean = false;
  
  private _selectedCategories: Category[];
  @Input() set selectedCategories(newCategories) {
    if (this._selectedCategories != newCategories)
      this._selectedCategories = newCategories;
  }
  
  t1Categories: Category[];
  
  @Input() t1Category: Category;
  @Output() t1CategoryChange = new EventEmitter<Category>();

  t2Categories: Category[];
  @Input() t2Category: Category;
  @Output() t2CategoryChange = new EventEmitter<Category>();

  t3Categories: Category[];
  @Input() t3Category: Category;
  @Output() t3CategoryChange = new EventEmitter<Category>();

  t4Categories: Category[];
  @Input() t4Category: Category;
  @Output() t4CategoryChange = new EventEmitter<Category>();

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
    });
  }

  getChildCategories(categoriesPropertyName: string, parentId: string) {
     let categoryTier = +categoriesPropertyName[1];
     this.deselectChildCategories(categoryTier);
    if (parentId) {
      this._categoryService.getChildCategories(parentId, this.showEmptyCategories).subscribe(cats => {
        // Bug here:
        // After switching t1 categories, t3CategoryDropdown set categegories() isn't being
        // triggered - can't figure out why. $10 PayPal bounty?
        this[categoriesPropertyName] = cats;
      });
    }
  }

  
  deselectChildCategories(tier: number) {
    if (tier <= 2) {
       this.t2Category = undefined;
    }
    if (tier <= 3) {
        this.t3Category = undefined;
    }
    if (tier <= 4) {
       this.t4Category = undefined;
    }
  }

}
