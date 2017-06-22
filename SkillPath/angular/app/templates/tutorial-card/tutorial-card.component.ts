import { LearnPageComponent } from './../../pages/learn-page/learn-page.component';
import { SubmitTutorialFormComponent } from './../submit-tutorial-form/submit-tutorial-form.component';
import { Tutorial } from './../../models/tutorial';
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
  DialogRef
  showDetailsModal() {
    let dialogRef = this._dialog.open(SubmitTutorialFormComponent);
    dialogRef.componentInstance.tutorial = this.tutorial;
    dialogRef.componentInstance.isEditing = true;
  }

  defaultImageUrl:string = "http://michaelbrant.com/wp-content/uploads/2012/06/photodune-907221-css3-code-m.jpg";

}
