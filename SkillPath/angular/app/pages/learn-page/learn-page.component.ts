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
   this.getTutorials(1);
  }
  tutorials = [];

  getTutorials(page: number, categoryId?: string) {
     this._tutorialService.getTutorials(page, categoryId).subscribe(tutorials => this.tutorials = tutorials //.concat(tutorials).concat(tutorials).concat(tutorials).concat(tutorials)
     );
  }
}
