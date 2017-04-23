import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.css']
})
export class CategorySearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   protected captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];

   selectItem(selectedItem) {
    console.log(selectedItem);
    this.selectedItem = selectedItem;
    
   }
   selectedItem: string = "";
}
