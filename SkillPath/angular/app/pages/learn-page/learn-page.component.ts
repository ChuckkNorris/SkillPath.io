import { CategoryService } from './../../services/category.service';
import { TUTORIALS } from './../../models/test-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.css']
})
export class LearnPageComponent implements OnInit {

  constructor(private _catService: CategoryService) { 

  }

  ngOnInit() {
    this._catService.getCategories(1);
  }

  tutorials = TUTORIALS;
}
