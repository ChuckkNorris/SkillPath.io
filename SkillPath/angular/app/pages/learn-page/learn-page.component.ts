import { CategoryService } from './../../services/category.service';
import { Category } from './../../models/category';
import { TutorialService } from './../../services/tutorial.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.css']
})
export class LearnPageComponent implements OnInit {

  constructor(
    private _categoryService: CategoryService,
    private _tutorialService: TutorialService) {}

  ngOnInit() {
    this.initializeInfiniteScroll();
    this.getTutorials(1);
  }
  tutorials = [];
  currentPage: number = 1;
  lastCategoryId: string;
  selectedCategories: Category[];

  onCategoriesChanged(categories: Category[]) {
    console.log(`LearnPage -> ${categories[0].name}`)
    let updatedCategory = this._categoryService.getUpdatedCategory(categories);
    if (updatedCategory)
      this.getTutorials(1, updatedCategory.id);
  }

  getTutorials(page: number, categoryId?: string) {
    this.lastCategoryId = categoryId;
    this.isLastPage = false;
    this.currentPage = page;
    console.log('Getting tutorials');
    this._tutorialService.getTutorials(page, categoryId).subscribe(tutorials => {
      if (page > 1) {
        this.tutorials = this.tutorials.concat(tutorials);
      }
      else {
        this.tutorials = tutorials;
      }
    });
   
  }

  isRetreivingTutorials: boolean = false;
  isLastPage: boolean = false;
  initializeInfiniteScroll() {
    window.onscroll = () => {
      if (!this.isRetreivingTutorials && !this.isLastPage) {
        let pageHeight = document.documentElement.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;
        let scrollPos = window.pageYOffset;
        let currentPosition = scrollPos + clientHeight;
        let percentageScrolled = currentPosition / pageHeight;
        if (percentageScrolled > .8) {
          this.isRetreivingTutorials = true;
          this.currentPage++;
          this._tutorialService.getTutorials(this.currentPage + 1, this.lastCategoryId).subscribe(tutorials => {
            if (tutorials.length > 0) 
              this.tutorials = this.tutorials.concat(tutorials);
            else
              this.isLastPage = true;
            this.isRetreivingTutorials = false;
          });
        }
      }
    }
  }


}
