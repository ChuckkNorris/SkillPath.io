import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-dropdown-list',
  templateUrl: './category-dropdown-list.component.html',
  styleUrls: ['./category-dropdown-list.component.css']
})
export class CategoryDropdownListComponent implements OnInit {

  constructor(private _categoryService: CategoryService) { }
  t1Categories: Category[] = [];
  t2Categories: Category[] = [];
  t3Categories: Category[] = [];
  t4Categories: Category[] = [];
  ngOnInit() {
    this.getCategories(1);
  }

  t1Updated(newCategory: Category) {
    console.log(newCategory);
    this.getChildCategories('t2Categories', newCategory.id);
  }

  getCategories(tier: number) {
    this._categoryService.getCategories(tier).subscribe(cats => {
      this.t1Categories = cats;
    });
  }

  getChildCategories(categoryListName: string, parentId: string) {
     this._categoryService.getChildCategories(parentId).subscribe(cats => {
       console.log(cats);
      this[categoryListName] = cats;
    });
  }

}
