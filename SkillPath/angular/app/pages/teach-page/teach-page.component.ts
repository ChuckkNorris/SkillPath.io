import { ActivatedRoute } from '@angular/router';
import { Tutorial } from './../../models/tutorial';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teach-page',
  templateUrl: './teach-page.component.html',
  styleUrls: ['./teach-page.component.css']
})
export class TeachPageComponent implements OnInit {

  constructor(private _route: ActivatedRoute) { }
  

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.tutorial.id = params['id'];
    })
  }
  tutorial: Tutorial = { tutorialCategories: [{},{},{},{}] }
}
