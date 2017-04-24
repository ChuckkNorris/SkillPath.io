import { Observable } from 'rxjs/Observable';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.css']
})
export class CategorySearchComponent implements OnInit {

  constructor(private _categoryService: CategoryService) { }
  @Input() tier: number;
  private categories: Observable<Category[]>;
  ngOnInit() {
    this.categories = this._categoryService.getCategories(this.tier);
  }
   protected captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];

   selectItem(selectedItem) {
    console.log(selectedItem);
    this.selectedItem = selectedItem;
    
   }
   selectedItem: string = "";
   filterCategories(value: string) {
    
    
   }
}
