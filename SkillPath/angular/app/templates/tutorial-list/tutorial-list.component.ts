import { Tutorial } from './../../models/tutorial';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TutorialService } from './../../services/tutorial.service';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent {

  // constructor(private _tutorialService: TutorialService) { 

  // }
  //  ngOnInit() {
  //  this.getTutorials(1);
  // }
  @Input() tutorials: Tutorial[] = [];

  // getTutorials(page: number, categoryId?: string) {
  //    this._tutorialService.getTutorials(page, categoryId).subscribe(tutorials => this.tutorials = tutorials);
  // }

  
}
