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

  constructor(private _categoryService: CategoryService, private toast: MdSnackBar) { }

  ngOnInit() {
    this.getCategories();
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

  showMessage(message: string) {
    this.toast.open(message);
  }

  updateParent(category?: Category) {
    this.categoryToUpdate = Object.assign({}, category);
    
    this.categoryToSave.tier = category.tier < 4 ? category.tier + 1 : category.tier;
    this.categoryToSave.parentId = category.id;
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
