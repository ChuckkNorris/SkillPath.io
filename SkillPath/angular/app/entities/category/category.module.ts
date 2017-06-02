import { CategoryService } from './services/category.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategorySearchComponent } from './category-search/category-search.component';

export { Category } from "./category";
export { CategoryService } from './services/category.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CategoryListComponent, CategorySearchComponent],
  exports: [CategoryListComponent, CategorySearchComponent],
  providers: [CategoryService]
})
export class CategoryModule { }
