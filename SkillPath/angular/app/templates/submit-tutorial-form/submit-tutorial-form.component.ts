import { LoaderService } from './../../services/loader.service';
import { ImgurService } from './../../services/imgur.service';
import { ImageService } from './../../services/image.service';
import { Observable } from 'rxjs/Observable';
import { CategoryListComponent } from './../category-list/category-list.component';
import { TutorialService } from './../../services/tutorial.service';
import { Category } from './../../models/category';
import { Tutorial } from './../../models/tutorial';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface ImageBlob {
  blob?: Blob;
  data?: string;
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
  selector: 'app-submit-tutorial-form',
  templateUrl: './submit-tutorial-form.component.html',
  styleUrls: ['./submit-tutorial-form.component.css']
})
export class SubmitTutorialFormComponent implements OnInit {

  constructor(private _imageService: ImageService,
    private _imgurService: ImgurService,
    private _loaderService: LoaderService,
    private _tutorialService: TutorialService) { }

  @Input() tutorial: Tutorial = { tutorialCategories: [{},{},{},{}] }
  @Output() tutorialChange = new EventEmitter<Tutorial>();
  @Output() submit = new EventEmitter<Tutorial>();

  ngOnInit() {
  }

  public emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);

  setCategoryId(tier: number, category: Category) {
    this.tutorial.tutorialCategories[0].categoryId=category.id;
  }
  picked: any;
  selectImage(image) {
    this.picked = image;
    console.log(image);
  }

  log(something: any) {
    console.log(something);
  }

  submitTutorial() {
    //this._tutorialService.saveTutorial(this.tutorial).subscribe();
    console.log('Saved');
  }

  onImagePaste(event: ClipboardEvent) {
    console.log(event);
    if (event.clipboardData.items) {
      let imageUrl;
      this._imageService.getImage(event.clipboardData).subscribe(image => {
        if (image) {
          this._loaderService.show();
          this._imgurService.uploadBlob(image.blob).subscribe((imageLink) => {
            this.tutorial.imageUrl = imageLink;
            this._loaderService.hide();
            //this._tutorialService.saveTutorial(this.tutorial).subscribe();
          })
          //this.tutorial.imageUrl = image.data;
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
