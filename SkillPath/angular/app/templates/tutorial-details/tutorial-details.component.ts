import { MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Tutorial } from './../../models/tutorial';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  constructor(private _router: Router) { }
  @Input() tutorial: Tutorial = {};
  @Input() dialogRef: MdDialogRef<TutorialDetailsComponent>;
  ngOnInit() {
  }

  requestUpdate() {
    this._router.navigate(['teach', this.tutorial.id]);
    this.dialogRef.close();
  }

}
