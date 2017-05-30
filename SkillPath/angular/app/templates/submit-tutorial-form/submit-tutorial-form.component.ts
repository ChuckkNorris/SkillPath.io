import { TutorialService } from './../../services/tutorial.service';
import { Category } from './../../models/category';
import { Tutorial } from './../../models/tutorial';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-tutorial-form',
  templateUrl: './submit-tutorial-form.component.html',
  styleUrls: ['./submit-tutorial-form.component.css']
})
export class SubmitTutorialFormComponent implements OnInit {

  constructor(private _tutorialService: TutorialService) { }
  tutorial: Tutorial = { tutorialCategories: [{},{},{},{}] }
  ngOnInit() {
  }

  setCategoryId(tier: number, category: Category) {
    this.tutorial.tutorialCategories[0].categoryId=category.id;
  }

  saveTutorial(form: any) {
    console.log(form);
    console.log(this.tutorial);
    this._tutorialService.saveTutorial(this.tutorial).subscribe();
  }

}
