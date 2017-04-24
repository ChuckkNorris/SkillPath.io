import { Observable } from 'rxjs/Observable';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/Rx';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.css']
})
export class CategorySearchComponent implements OnInit {

  constructor(private _categoryService: CategoryService) { }
  @Input() title: string;
  @Input() tier: number;
  @Input() selectedCategory: Category = {};
  @Output() selectedCategoryChange: EventEmitter<Category> = new EventEmitter<Category>();
  private categories: Category[];
  ngOnInit() {
    this._categoryService.getCategories(this.tier).subscribe(categories => this.categories = categories);
  }

  private filteredCategories: Category[];

  onSelectedCategoryChanged() {
    
  }
  isFocused: boolean = false;
  onFocused() {
     this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  log(message) {
    console.log(message);
  }

  filterCategories() {

  }
  
   selectCategory(selectedCategoryId: string) {
     //Observable.from(this.categories).filter(x => x.filter)
     //this.selectedCategory = 
     this.categories.forEach(cat => {
       if (cat.id == selectedCategoryId) {
        this.selectedCategory = cat;
        this.selectedCategoryChange.emit(this.selectedCategory);
       }
      });
      
   }
  
}
