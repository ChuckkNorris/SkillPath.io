
import { SubmitTutorialFormComponent } from '../submit-tutorial-form/submit-tutorial-form.component';
import { Tutorial } from '../tutorial';
import { Component, OnInit, Input } from '@angular/core';
import { MdDialog } from "@angular/material";


@Component({
  selector: 'app-tutorial-card',
  templateUrl: './tutorial-card.component.html',
  styleUrls: ['./tutorial-card.component.css']
})
export class TutorialCardComponent implements OnInit {

  constructor(private _dialog: MdDialog) { }

  ngOnInit() {
  }

  @Input() tutorial: Tutorial = {};

  openTutorialInNewWindow() {
    window.open(this.tutorial.linkUrl, "_blank");
  }

  showDetailsModal() {
    this._dialog.open(SubmitTutorialFormComponent);
  }

}
