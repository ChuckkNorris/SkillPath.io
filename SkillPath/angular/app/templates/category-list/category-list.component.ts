import { CategorySearchComponent } from './../category-search/category-search.component';
import { Category } from './../../models/category';
import { Component, OnInit, Output, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() t1CategoryChange = new EventEmitter<Category>();
  t1Category: Category= {};

  @Output() t2CategoryChange = new EventEmitter<Category>();
  t2Category: Category= {};

  @Output() t3CategoryChange = new EventEmitter<Category>();
  t3Category: Category= {};

  @Output() t4CategoryChange = new EventEmitter<Category>();
  t4Category: Category= {};

  getXsFlex() {
    return 100;
  }

  getSmFlex() {
    return 48;
  }

   getMdFlex() {
    return 48;
  }

   getLgFlex() {
    return 48;
  }
  getT1Flex() {
    if (this.t1Category.id) return "50";
    else return "auto";
  }

  getFlex() {
    let toReturn: string = "25";
    if (!this.t2Category.id) {
      toReturn="auto";
    }
    return toReturn;
  }
    getT3Flex() {
    let toReturn: string = "25";
    if (!this.t3Category.id) {
      toReturn="auto";
    }
    return toReturn;
  }
  @ViewChildren('categoryTier') children: QueryList<CategorySearchComponent>;

  getChildCategories(category: Category) {
    let childSearch = this.children.find(catSearch => catSearch.tier == category.tier + 1);

    if (childSearch) 
      childSearch.getCategories(category.id);
  }
  
  selectCategory(category: Category) {
    this.deselectChildCategories(category.tier);
    switch (category.tier) {
      case 1:
        this.t1CategoryChange.emit(category); 
        this.getChildCategories(category);
        break;
      case 2:
        this.t2CategoryChange.emit(category); 
        this.getChildCategories(category);
        break;
      case 3:
        this.t3CategoryChange.emit(category); 
        this.getChildCategories(category);
        break;
      case 4:
        this.t4CategoryChange.emit(category); 
        break;
    }
  }

  deselectChildCategories(tier: number) {
    if (tier < 2) 
      this.t2Category = {};
    if (tier < 3) 
      this.t3Category = {};
    if (tier < 4) 
      this.t4Category = {};
  }

}
