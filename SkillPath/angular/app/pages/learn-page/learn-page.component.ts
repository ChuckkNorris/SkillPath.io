import { Category } from './../../models/category';
import { TutorialService } from './../../services/tutorial.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.css']
})
export class LearnPageComponent implements OnInit {

  constructor(private _tutorialService: TutorialService) {

  }

  ngOnInit() {
    this.initializeInfiniteScroll();
  }
  tutorials = [];
  currentPage: number = 1;
  lastCategoryId: string;
  lastTier: number;

  onCategoriesChanged(categories: Category[]) {
    console.log(categories);
    let definedCategories = categories.filter(x => x && x.id != undefined);
    console.log(definedCategories);
    if (definedCategories) {
      let lastCategory = definedCategories[definedCategories.length - 1];
      this.getTutorials(1, lastCategory.id, lastCategory.tier);
    }
  }

  getTutorials(page: number, categoryId?: string, tier?: number) {
    this.lastCategoryId = categoryId;
    this.lastTier = tier;
    this.isLastPage = false;
    this.currentPage = page;
   // if (tier > 2) {
      this._tutorialService.getTutorials(page, categoryId).subscribe(tutorials => {
        if (page > 1) {
          this.tutorials = this.tutorials.concat(tutorials);
        }
        else {
          this.tutorials = tutorials;
        }
      });
   // }
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
          //this.getTutorials(this.currentPage, this.lastCategoryId, this.lastTier);
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
