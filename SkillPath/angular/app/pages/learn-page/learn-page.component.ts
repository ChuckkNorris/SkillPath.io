import { TUTORIALS } from './../../models/test-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.css']
})
export class LearnPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  tutorials = TUTORIALS;
}
