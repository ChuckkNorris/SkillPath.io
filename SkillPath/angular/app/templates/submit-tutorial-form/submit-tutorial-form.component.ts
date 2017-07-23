import { TUTORIALS } from './../../models/test-data';
import { LoaderService } from './../../services/loader.service';
import { ImgurService } from './../../services/imgur.service';
import { ImageService } from './../../services/image.service';
import { Observable } from 'rxjs/Observable';
import { CategoryListComponent } from './../category-list/category-list.component';
import { TutorialService } from './../../services/tutorial.service';
import { Category } from './../../models/category';
import { Tutorial } from './../../models/tutorial';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from "@angular/router";

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
    private _imgurService: ImgurService,
    private _loaderService: LoaderService,
    private _router: Router,
    private _tutorialService: TutorialService) { }

  //tutorial: Tutorial = { tutorialCategories: [] }
  // tutCat1: Category;
  // tutCat2: Category;
  // tutCat3: Category;
  // tutCat4: Category;

  private _tutorial: Tutorial = {};
  @Input() set tutorial(val) {
    this._tutorial = val;
    // for (var i = 0; i < val.tutorialCategories.length; i++) {
    //   this['tutCat' + (i+1)] = val.tutorialCategories[i];
    // }
  }
  get tutorial() {
    return this._tutorial;
  }
  @Output() tutorialChange = new EventEmitter<Tutorial>();
  @Output() submit = new EventEmitter<Tutorial>();

  @Input() isEditing: boolean;

  submitButtonText: string = "Share";

  ngOnInit() {
    if (this.isEditing)
      this.submitButtonText = "Update";

  }

  picked: any;
  selectImage(image) {
    this._imageService.getImageFromDataUrl(image._dataURL).subscribe(imageBlob => {
      this.uploadImage(imageBlob);
    })
  }

  submitTutorial() {
    this._loaderService.show();
    this._tutorialService.saveTutorial(this.tutorial).subscribe(() => {

      this._loaderService.hide();
      this._router.navigate(['learn']);
    });
  }

  justPastedUrl: boolean = false;
  pastePopulateTutorial(pasteEvent) {
    let clipboardData = pasteEvent.clipboardData;
    let text = clipboardData.getData('Text');
    if (text)
      this.tryPopulateTutorial(text, true);
  }

  tryPopulateTutorial(tutorialUrl: any, isPasteEvent: boolean = false) {
    if (tutorialUrl.target) {
      tutorialUrl = tutorialUrl.target.value;
    }

    if (!this.tutorial.id) {
      // If they paste, don't get info on following blur
      if (!this.justPastedUrl || isPasteEvent)
        this._tutorialService.getTutorialWithArticleInfo(tutorialUrl).subscribe(newTut => {
          if (newTut) {
            if (!this.tutorial.title && newTut.title)
              this.tutorial.title = newTut.title;
            if (!this.tutorial.description && newTut.description)
              this.tutorial.description = newTut.description;
            if (!this.tutorial.imageUrl && newTut.imageUrl)
              this.tutorial.imageUrl = newTut.imageUrl;
          }
        });
      
      this.justPastedUrl = isPasteEvent;
      

    }
  }

  private uploadImage(blob: Blob) {
    this._loaderService.show();
    this._imgurService.uploadBlob(blob).subscribe((imageLink) => {
      this.tutorial.imageUrl = imageLink;
      this._loaderService.hide();
    });
  }

  onCategoryChange(tier: number, categoryId: string) {
    let index = +tier - 1;
    if (this.tutorial && this.tutorial.tutorialCategories[index]) {
      this.tutorial.tutorialCategories[index].categoryId = categoryId;
    }
  }

  onImagePaste(event: ClipboardEvent) {
    if (event.clipboardData.items) {
      let imageUrl;
      this._imageService.getImage(event.clipboardData).subscribe(image => {
        if (image) {
          this.uploadImage(image.blob);
          event.preventDefault();
          //this.tutorial.imageUrl = image.data;
        }
        else {
          event.clipboardData.items[0].getAsString(imageUrl => {
            if (imageUrl.startsWith('http')) {
              this.tutorial.imageUrl = imageUrl;
            }
          });
        }

      });
    }
  }
  // https://cdn-images-1.medium.com/max/1200/1*5WzlrdAGGGSKqJBesbl8cA.png

}
