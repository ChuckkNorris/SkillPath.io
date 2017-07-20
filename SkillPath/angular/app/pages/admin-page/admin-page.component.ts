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

  ngOnInit() {
    this.getCategories();
    this.getTutorials();
  }
  
  categoryToSave: Category = {tier: 1};
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
    this.categoryToUpdate = Object.assign({}, category);
    
    this.categoryToSave.tier = this.getNextTierSafely(category.tier);
    this.categoryToSave.parentId = category.id;
    this.getTutorials(category.id);
  }

  private getNextTierSafely(currentTier) {
    let toReturn = 1;
    toReturn = currentTier < 4 ? currentTier + 1 : toReturn;
    return toReturn;
    
  }

  categoryToUpdate: Category;

  updateCategory() {
    this._categoryService.updateCategory(this.categoryToUpdate).subscribe((response) => {
      this.showMessage('Category updated');
    });
  }

  deleteCategory() {
    this._categoryService.deleteCategory(this.categoryToUpdate.id).subscribe((response) => {
      this.showMessage('Category deleted');
    });
  }

}
