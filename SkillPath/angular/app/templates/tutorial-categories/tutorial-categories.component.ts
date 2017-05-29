import { Category } from './../../models/category';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tutorial-categories',
  templateUrl: './tutorial-categories.component.html',
  styleUrls: ['./tutorial-categories.component.css']
})
export class TutorialCategoriesComponent implements OnInit {

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

  selectCategory(category: Category) {
    //console.log(category);
    switch (category.tier) {
      case 1:
        this.t1CategoryChange.emit(category); 
        this.t2Category = {};
        this.deselectChildCategories(category.tier);
        break;
      case 2:
        this.t2CategoryChange.emit(category); 
        this.deselectChildCategories(category.tier);
        break;
      case 3:
        this.t3CategoryChange.emit(category); 
        this.deselectChildCategories(category.tier);
        break;
      case 4:
        this.t4CategoryChange.emit(category); 
        this.deselectChildCategories(category.tier);
        break;
    }
  }

  deselectChildCategories(tier: number) {
    console.log('Selected Tier' + tier);
    if (tier < 2) {
      this.t2Category = {};
    }
    if (tier < 3) {
      this.t3Category = {};
    }

    if (tier < 4) {
      this.t4Category = {};
    }

  }

}
