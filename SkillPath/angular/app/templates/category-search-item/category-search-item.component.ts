import { Category } from './../../models/category';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-search-item',
  templateUrl: './category-search-item.component.html',
  styleUrls: ['./category-search-item.component.css']
})
export class CategorySearchItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() category: Category = {};
}
