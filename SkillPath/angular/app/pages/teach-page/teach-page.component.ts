import { TutorialService } from './../../services/tutorial.service';
import { ActivatedRoute } from '@angular/router';
import { Tutorial } from './../../models/tutorial';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teach-page',
  templateUrl: './teach-page.component.html',
  styleUrls: ['./teach-page.component.css']
})
export class TeachPageComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _tutorialService: TutorialService) { }
  
  tutorial: Tutorial = { tutorialCategories: []};
  ngOnInit() {
    this._route.params.subscribe(params => {
      let tutorialId = params['id'];
      if (tutorialId)
        this._tutorialService.getTutorial(tutorialId).subscribe(tut => {
          this.tutorial = tut;
        });
    })
  }
  
}
