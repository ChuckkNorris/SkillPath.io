import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-auto-complete-test',
  templateUrl: './auto-complete-test.component.html',
  styleUrls: ['./auto-complete-test.component.css']
})
export class AutoCompleteTestComponent implements OnInit {

  

  constructor() { 
     this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterStates(name) as string[]);
        
  }

  ngOnInit() {

  }
  selectedValue: string;
  selectState(state) {
    this.selectedValue = state;
  }

  logState(state) {
  }
  myFirst: any;

   filterStates(val: string) : string[] {
    return val ? this.states.filter(s => new RegExp(`^${val}`, 'gi').test(s))
               : this.states;
  }

 activeState = {
   value: 'Alabama',
   display: 'Alabama'
 };

  stateCtrl: FormControl;
  filteredStates: Observable<string[]>;

  states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

}
