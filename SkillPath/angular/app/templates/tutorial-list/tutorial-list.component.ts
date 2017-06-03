import { Tutorial } from './../../models/tutorial';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TutorialService } from './../../services/tutorial.service';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent {

  @Input() tutorials: Tutorial[] = [];
  
}
