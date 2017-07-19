import { MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Tutorial } from './../../models/tutorial';
import { Component, OnInit, Input } from '@angular/core';
import { DEFAULT_IMAGE_URL } from "../../constants";
  
@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent {

  constructor(
    private _router: Router) { }
  @Input() tutorial: Tutorial = {};
  @Input() dialogRef: MdDialogRef<TutorialDetailsComponent>;

  defaultImageUrl:string = DEFAULT_IMAGE_URL; 

  requestUpdate() {
    this._router.navigate(['teach', this.tutorial.id]);
    this.dialogRef.close();
  }

}
