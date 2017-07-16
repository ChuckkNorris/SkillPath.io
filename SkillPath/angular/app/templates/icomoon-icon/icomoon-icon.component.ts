import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icomoon-icon',
  templateUrl: './icomoon-icon.component.html',
  styleUrls: ['./icomoon-icon.component.css']
})
export class IcomoonIconComponent {

  constructor() { }
  @Input() set icon(val: string) {
     if (val) {
      this.parsedIcon = val.split('.');
    }
  }
  parsedIcon: string[] = [];

}
