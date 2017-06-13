import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ImgurImage } from '../models/imgur-image';
import { Observable } from 'rxjs';

@Injectable()
export class ImgurService {

  constructor(private _http: Http) { }

  uploadBlob(imageFile: Blob) : Observable<string> {
    let formData:FormData = new FormData();
    formData.append('image', imageFile);
    let imgurUrl = '';
    let headers:Headers = new Headers();
    headers.append('Authorization', 'Client-ID a5f5a8a9e31b6f4');
    return Observable.create(obs => {
      this._http.post('https://api.imgur.com/3/image', formData, {
        headers: headers
      }).subscribe(response => {
        let imgurResponse = response.json().data as ImgurImage;
        obs.next(imgurResponse.link);
      })
    });
  }

//   uploadImage(imageFile: File) : Observable<string> {
//     let formData:FormData = new FormData();
//     formData.append('image', imageFile, imageFile.name);
//     let imgurUrl = '';
//     let headers:Headers = new Headers();
//     headers.append('Authorization', 'Client-ID a5f5a8a9e31b6f4');
//     return Observable.create(obs => {
//       this._http.post('https://api.imgur.com/3/image', formData, {
//         headers: headers
//       }).subscribe(response => {
//         let imgurResponse = response.json() as ImgurImage;
//         obs.next(imgurResponse.link);
//       })
//     });
//   }

}
