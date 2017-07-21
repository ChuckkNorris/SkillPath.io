import { TutorialLinkExists } from './../../directives/tutorial-link-exists.directive';
import { Tutorial } from './../../models/tutorial';
import { LoaderService } from './../../services/loader.service';
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
    private _loaderService: LoaderService,
    private _tutorialService: TutorialService) { }

  ngOnInit() {
    this.initializeInfiniteScroll();
    this.getTutorials(1, null, true);
  }

  filteredTutorials: Tutorial[];
  searchText: string;
  searchTutorials(searchText: string) {
    let safeSearchText = searchText.toLowerCase();
    let filteredTuts = this.tutorials.filter(tut => {
      // console.log(`${safeSearchText} == ${tut.title}`);
      // console.log(`${safeSearchText} == ${tut.description}`);
      let toReturn = this.doesSafeContain(safeSearchText, tut.title)
        || this.doesSafeContain(safeSearchText, tut.description);
      console.log(toReturn);
      return toReturn;
    });
    this.filteredTutorials = filteredTuts;
    console.log(filteredTuts);
  }

  private doesSafeContain(searchText: string, strToCheck: string): boolean {
    let index = strToCheck.toLowerCase().indexOf(searchText);
    console.log(`Index: ${index}`);
    return index > -1;
  }

  lastCategoryId: string;
  selectedCategories: Category[];
  onCategoriesChanged(categories: Category[]) {
    let updatedCategory = this._categoryService.getUpdatedCategory(categories);
    if (updatedCategory) {

      this.getTutorials(1, updatedCategory.id, true);
    }

  }

  _tutorials: Tutorial[];
  set tutorials(tutorials: Tutorial[]) {
    this._tutorials = tutorials;
    this.filteredTutorials = this._tutorials;
  }
  get tutorials(): Tutorial[] {
    return this._tutorials;
  }

  currentPage: number = 1;
  getTutorials(page: number, categoryId?: string, showLoader?: boolean) {
    this.lastCategoryId = categoryId;
    this.isLastPage = false;
    this.currentPage = page;

    if (showLoader)
      this._loaderService.show();

    this._tutorialService.getTutorials(page, categoryId).subscribe(tutorials => {
      if (page > 1)
        this.tutorials = this.tutorials.concat(tutorials);
      else
        this.tutorials = tutorials;
      if (showLoader)
        this._loaderService.hide();
      if (this.searchText)
        this.searchTutorials(this.searchText);
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
