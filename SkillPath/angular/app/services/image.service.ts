import { ImageBlob } from './../templates/submit-tutorial-form/submit-tutorial-form.component';
import { Observable } from 'rxjs/Observable';
import { Category } from './../models/category';
import { SkillpathApiService } from './../skillpath-api.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

  constructor(private _api: SkillpathApiService ) { 
   
  }

  getImage(fileDataTransfer: DataTransfer): Observable<ImageBlob>  {
    let toReturn: ImageBlob;
    let items =fileDataTransfer.items;
    return Observable.create(obs => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          let file = items[i].getAsFile();
          this.getResizedImage(file).subscribe(imageBlob => {
            obs.next(imageBlob);
          });
        }
        else if (i == items.length - 1) {
          obs.next();
        }
      }
    });

  }

  getImageFromDataUrl(dataUrl): Observable<any> {
    return Observable.create(obs => {
       let image = new Image();
        image.onload = (imageEvent) => {
          let resizedUrl = this.resize(image, 600, 400);
          let resizedImage = this.dataURLToBlob(resizedUrl);
          obs.next(resizedImage);
        };
        image.src = dataUrl;
    });
  }

  getResizedImage(imageFile: File) : Observable<ImageBlob> {
    let toReturn: ImageBlob = {};
    let fr = new FileReader();
    return Observable.create(obs => {
      fr.onload = (frEvent) => {
        let image = new Image();
        image.onload = (imageEvent) => {
          let resizedUrl = this.resize(image, 900, 500);
          toReturn.data = resizedUrl;
          let resizedImage = this.dataURLToBlob(resizedUrl);
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

  public dataURLToBlob(dataURL) {
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
