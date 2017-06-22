import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icomoon-icon',
  templateUrl: './icomoon-icon.component.html',
  styleUrls: ['./icomoon-icon.component.css']
})
export class IcomoonIconComponent implements OnInit {

  constructor() { }
  @Input() icon: string = "";
  parsedIcon: string[] = [];
  ngOnInit() {
    this.parseIcon();
  }

  parseIcon() {
    if (this.icon) {
      this.parsedIcon = this.icon.split('.');
    }
  }


}
