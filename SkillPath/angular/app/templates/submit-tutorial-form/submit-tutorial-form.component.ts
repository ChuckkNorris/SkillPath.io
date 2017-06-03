import { Observable } from 'rxjs/Observable';
import { CategoryListComponent } from './../category-list/category-list.component';
import { TutorialService } from './../../services/tutorial.service';
import { Category } from './../../models/category';
import { Tutorial } from './../../models/tutorial';
import { Component, OnInit } from '@angular/core';



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

  constructor(private _tutorialService: TutorialService) { }
  tutorial: Tutorial = { tutorialCategories: [{},{},{},{}] }
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
    console.log(event.clipboardData);
    var items =event.clipboardData.items;

    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        //image
        var file = items[i].getAsFile();
         console.log(file);
        this.getResizedImage(file).subscribe(imageBlob => {
          this.bannerImage = imageBlob.data;
        });
        var URLObj = window.URL || (window as any).webkitURL;
        var source = URLObj.createObjectURL(file);
       
        //this.paste_createImage(source);
      }
    }
			event.preventDefault();
    
  }

  getResizedImage(imageFile: File) : Observable<ImageBlob> {
    let toReturn: ImageBlob = {};
    let fr = new FileReader();
    return Observable.create(obs => {
      fr.onload = (frEvent) => {
        var image = new Image();
        image.onload = (imageEvent) => {
          let resizedUrl = this.resize(image, 300, 300);
          toReturn.data = resizedUrl;
          console.log(resizedUrl);
          let resizedImage = this.dataURLToBlob(resizedUrl);
          console.log(resizedImage);
          toReturn.blob = resizedImage;
          obs.next(toReturn);
        };
        let frResult = (frEvent as any).target.result;
        image.src = frResult;
        
      }
      fr.readAsDataURL(imageFile);
    });
  }

  private resize(img, maxWidth: number, maxHeight: number): string {
    // Get the images current width and height
    let width = img.width;
    let height = img.height;
    // Set the WxH to fit the Max values (but maintain proportions)
    if (width > height) {
        if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }
    }
    // create a canvas object
    let canvas = document.createElement("canvas");
    // Set the canvas to the new calculated dimensions
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");  
    ctx.drawImage(img, 0, 0,  width, height); 
    let dataUrl = canvas.toDataURL('image/jpeg');
    return dataUrl;
  }

  private dataURLToBlob(dataURL) {
    let BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        let parts = dataURL.split(',');
        let contentType = parts[0].split(':')[1];
        let raw = parts[1];
        return new Blob([raw], {type: contentType});
    }

    let parts = dataURL.split(BASE64_MARKER);
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
  }

}



// var CLIPBOARD = new CLIPBOARD_CLASS("my_canvas", true);

// /**
//  * image pasting into canvas
//  * 
//  * @param {string} canvas_id - canvas id
//  * @param {boolean} autoresize - if canvas will be resized
//  */
// function CLIPBOARD_CLASS(canvas_id, autoresize) {
// 	var _self = this;
// 	var canvas = document.getElementById(canvas_id);
// 	//var ctx = (document.getElementById(canvas_id) as any).getContext("2d");

// 	//handlers
// 	document.addEventListener('paste', function (e) { _self.paste_auto(e); }, false);

// 	//on paste
// 	this.paste_auto = function (e) {
//     console.log(e.clipboardData);
// 		if (e.clipboardData) {
// 			var items = e.clipboardData.items;
// 			if (!items) return;
			
// 			//access data directly
// 			for (var i = 0; i < items.length; i++) {
// 				if (items[i].type.indexOf("image") !== -1) {
// 					//image
// 					var blob = items[i].getAsFile();
//           console.log(blob);
// 					var URLObj = window.URL || (window as any).webkitURL;
// 					var source = URLObj.createObjectURL(blob);
// 					//this.paste_createImage(source);
// 				}
// 			}
// 			e.preventDefault();
// 		}
// 	};
// 	// //draw pasted image to canvas
// 	// this.paste_createImage = function (source) {
// 	// 	var pastedImage = new Image();
// 	// 	pastedImage.onload = function () {
// 	// 		if(autoresize == true){
// 	// 			//resize
// 	// 			(canvas as any).width = pastedImage.width;
// 	// 			(canvas as any).height = pastedImage.height;
// 	// 		}
// 	// 		else{
// 	// 			//clear canvas
// 	// 			ctx.clearRect(0, 0, (canvas as any).width, (canvas as any).height);
// 	// 		}
// 	// 		ctx.drawImage(pastedImage, 0, 0);
// 	// 	};
// 	// 	pastedImage.src = source;
// 	// };
// }
