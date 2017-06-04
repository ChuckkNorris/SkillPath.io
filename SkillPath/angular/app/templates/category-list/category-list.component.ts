import { CategorySearchComponent } from './../category-search/category-search.component';
import { Category } from './../../models/category';
import { Component, OnInit, Output, EventEmitter, ViewChild, ViewChildren, QueryList, Input } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() shouldHideEmpty: boolean;

  @Output() t1CategoryChange = new EventEmitter<Category>();
  t1Category: Category= {};

  @Output() t2CategoryChange = new EventEmitter<Category>();
  t2Category: Category= {};

  @Output() t3CategoryChange = new EventEmitter<Category>();
  t3Category: Category= {};

  @Output() t4CategoryChange = new EventEmitter<Category>();
  t4Category: Category= {};

  getXsFlex() {
    return "300px";
  }

  getSmFlex() {
    return "300px";
  }

   getMdFlex() {
    return "300px";
  }

   getLgFlex() {
    return "300px";
  }

  
 
  @ViewChildren('categoryTier') children: QueryList<CategorySearchComponent>;
  @Input() shouldGetEmptyCategories: boolean = false;
  getChildCategories(category: Category) {
    let childSearch = this.children.find(catSearch => catSearch.tier == category.tier + 1);

    if (childSearch) {
      childSearch.getCategories(category.id);
      //childSearch.focus();
    }
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
