import { Tutorial } from './../../models/tutorial';
import { TutorialService } from './../../services/tutorial.service';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from "@angular/material";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  tutorials: Tutorial[] = [];

  constructor(private _categoryService: CategoryService, private _tutorialService:TutorialService, private toast: MdSnackBar) { }
  literally: string;
  ngOnInit() {
    this.getCategories();
    this.getTutorials();
    let test = 'hello';
    this.literally = `${test} world`;
  }
  
  categoryToSave: Category = {};
  saveCategory() {
    this._categoryService.saveCategory(this.categoryToSave).subscribe((response) => {
      let message = response.message || "Category Saved Successfully!";
      this.showMessage(message);

    });
    this.getCategories();
  }
  t1Categories: Observable<Category[]>;
  
  getCategories() {
    this.t1Categories = this._categoryService.getCategories(1);
  }

  getTutorials(categoryId?) {
    this._tutorialService.getTutorials(1, categoryId).subscribe(tutorials => this.tutorials = tutorials);
  }

  showMessage(message: string) {
    this.toast.open(message);
  }

  updateParent(categories?: Category[]) {
    let category = this._categoryService.getUpdatedCategory(categories);
    console.log(category);
    this.categoryToUpdate = Object.assign({}, category);
    
    this.categoryToSave.tier = category.tier < 4 ? category.tier + 1 : category.tier;
    this.categoryToSave.parentId = category.id;
    this.getTutorials(category.id);
  }

  categoryToUpdate: Category;

  updateCategory() {
    this._categoryService.updateCategory(this.categoryToUpdate).subscribe((response) => {
      console.log(response);
      this.showMessage('Category updated');
    });
  }

  deleteCategory() {
    this._categoryService.deleteCategory(this.categoryToUpdate.id).subscribe((response) => {
      console.log(response);
      this.showMessage('Category deleted');
    });
  }

}
