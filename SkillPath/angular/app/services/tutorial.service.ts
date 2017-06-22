import { LoaderService } from './loader.service';
import { Tutorial } from './../models/tutorial';
import { Observable } from 'rxjs/Observable';
import { SkillpathApiService } from './../skillpath-api.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TutorialService {

  constructor(private _api: SkillpathApiService) { }

  public saveTutorial(tutorial: Tutorial) {
    // let copy: Tutorial;
    // copy = Object.assign(copy, tutorial);
    
    return this._api.post('/Tutorial/save', tutorial);
  }

  public getTutorials(page: number, categoryId?: string): Observable<Tutorial[]> {
    var params = {
      page: page,
      parentCategoryId: categoryId
    };
    return this._api.get('/Tutorial/Get', params).map(x => x as Tutorial[]);
  }

}
