import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  constructor() { }
  navigationActiveStyle = "mat-accent mat-raised-button";
  ngOnInit() {
  }

    githubUrl = "https://github.com/ChuckkNorris/SkillPath.io/tree/master/SkillPath";
    openGitHub() {
      window.open(this.githubUrl, "_blank");
    }

}
