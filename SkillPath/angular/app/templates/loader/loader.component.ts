import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private loaderService: LoaderService) { }
  shouldShowSpinner: boolean = false;
  ngOnInit() {
    this.loaderService.loaderSubscription.subscribe(shouldShowSpinner => {
      this.shouldShowSpinner = shouldShowSpinner;
    });
  }

}
