import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial-categories',
  templateUrl: './tutorial-categories.component.html',
  styleUrls: ['./tutorial-categories.component.css']
})
export class TutorialCategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  t1Category: Category= {};
  t2Category: Category= {};
  t3Category: Category= {};
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

}
