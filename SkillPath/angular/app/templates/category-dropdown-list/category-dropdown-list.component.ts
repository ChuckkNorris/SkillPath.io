import { NgForm, NgModel } from '@angular/forms';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-category-dropdown-list',
  templateUrl: './category-dropdown-list.component.html',
  styleUrls: ['./category-dropdown-list.component.css']
})
export class CategoryDropdownListComponent implements OnInit {

  constructor(private _categoryService: CategoryService, private tutorialForm: NgForm) { }
  
  @Input() showEmptyCategories: boolean = false;
  
  t1Categories: Category[];
  t1Category: Category;
  t2Categories: Category[];
  t2Category: Category;
  t3Categories: Category[];
  t3Category: Category;
  t4Categories: Category[];
  t4Category: Category;

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

  getChildCategories(categoryListName: string, parentId: string) {
    this.deselectChildCategories(+categoryListName[1]);
    if (parentId) {
      this._categoryService.getChildCategories(parentId, this.showEmptyCategories).subscribe(cats => {
        this[categoryListName] = cats;
      });
    }
  }

  deselectChildCategories(tier: number) {
    if (tier == 2) {
      this.t2Category = undefined;
    }
    if (tier == 3) {
       this.t3Category = undefined;  
    }
    if (tier == 4) {
       this.t4Category = undefined;
    }
  }

}
