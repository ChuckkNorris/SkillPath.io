import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private _categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }
  categoryToSave: Category = {};
  saveCategory() {
    this._categoryService.saveCategory(this.categoryToSave).subscribe((response) => {
      let message = "";
      if (response.message) {
        message = response.message;
      } else {
        message = "Category Saved Successfully!";
      }
      console.log(message);

    });
    this.getCategories();
  }
  t1Categories: Observable<Category[]>;
  getCategories() {
    this.t1Categories = this._categoryService.getCategories(1);
  }

  showMessage(message: string) {

  }

}
