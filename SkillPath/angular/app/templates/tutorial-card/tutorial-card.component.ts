import { TutorialDetailsComponent } from './../tutorial-details/tutorial-details.component';
import { LearnPageComponent } from './../../pages/learn-page/learn-page.component';
import { SubmitTutorialFormComponent } from './../submit-tutorial-form/submit-tutorial-form.component';
import { Tutorial } from './../../models/tutorial';
import { Component, OnInit, Input } from '@angular/core';
import { MdDialog } from "@angular/material";
import { DEFAULT_IMAGE_URL } from "../../constants";

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
    //SubmitTutorialFormComponent
    let dialogRef = this._dialog.open(TutorialDetailsComponent);
    dialogRef.componentInstance.tutorial = this.tutorial;
    dialogRef.componentInstance.dialogRef = dialogRef;
    //dialogRef.componentInstance.isEditing = true;
  }

  defaultImageUrl:string = DEFAULT_IMAGE_URL; 

}
