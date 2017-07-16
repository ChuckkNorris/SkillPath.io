import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-dropdown-list',
  templateUrl: './category-dropdown-list.component.html',
  styleUrls: ['./category-dropdown-list.component.css']
})
export class CategoryDropdownListComponent implements OnInit {

  constructor(private _categoryService: CategoryService) { }
  
  @Input() showEmptyCategories: boolean = true;
  t1Categories: Category[] = [];
  selectedT1Category: Category;
  t2Categories: Category[] = [];
  selectedT2Category: Category;
  t3Categories: Category[] = [];
  selectedT3Category: Category;
  t4Categories: Category[] = [];
  selectedT4Category: Category;
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
    this._categoryService.getChildCategories(parentId, this.showEmptyCategories).subscribe(cats => {
      this[categoryListName] = cats;
    });
  }

  deselectChildCategories(tier: number) {
    if (tier == 2) {
      this.selectedT2Category = undefined;
    }
    if (tier == 3) {
       this.selectedT3Category = undefined;  
    }
    if (tier == 4) {
       this.selectedT4Category = undefined;
    }
  }

}
