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
    this._tutorialService.getTutorials(1).subscribe(tutorials => this.tutorials = tutorials);
  }
  tutorials = [];
}
