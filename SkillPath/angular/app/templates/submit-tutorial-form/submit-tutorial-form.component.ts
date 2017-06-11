import { ImageService } from './../../services/image.service';
import { Observable } from 'rxjs/Observable';
import { CategoryListComponent } from './../category-list/category-list.component';
import { TutorialService } from './../../services/tutorial.service';
import { Category } from './../../models/category';
import { Tutorial } from './../../models/tutorial';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';



export interface ImageBlob {
  blob?: Blob;
  data?: string;
}

@Component({
  selector: 'app-submit-tutorial-form',
  templateUrl: './submit-tutorial-form.component.html',
  styleUrls: ['./submit-tutorial-form.component.css']
})
export class SubmitTutorialFormComponent implements OnInit {

  constructor(private _imageService: ImageService,
    private _tutorialService: TutorialService) { }

  @Input() tutorial: Tutorial = { tutorialCategories: [{},{},{},{}] }
  @Output() tutorialChange = new EventEmitter<Tutorial>();

  ngOnInit() {
  }

  setCategoryId(tier: number, category: Category) {
    this.tutorial.tutorialCategories[0].categoryId=category.id;
  }

  saveTutorial(form: any) {
    console.log(form);
    console.log(this.tutorial);
    this._tutorialService.saveTutorial(this.tutorial).subscribe();
  }
  bannerImage: any;
  onImagePaste(event: ClipboardEvent) {
    if (event.clipboardData.items) {
      let imageUrl;
      this._imageService.getImage(event.clipboardData).subscribe(image => {
        if (image) {
          this.tutorial.imageUrl = image;
        }
        else {
          event.clipboardData.items[0].getAsString(imageUrl => {
            if (imageUrl.startsWith('https')) {
              this.tutorial.imageUrl = imageUrl;
            }
          });
        }
        event.preventDefault();
      });
    }
  }
  // https://cdn-images-1.medium.com/max/1200/1*5WzlrdAGGGSKqJBesbl8cA.png

}
