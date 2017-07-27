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

  public updateTutorial(tutorial: Tutorial) {
    // let copy: Tutorial;
    // copy = Object.assign(copy, tutorial);

    return this._api.put('/Tutorial/update', tutorial);
  }

  public getTutorial(id: string): Observable<Tutorial> {
    var params = {
      id: id
    };
    return this._api.get('/Tutorial/GetTutorial', params).map(x => x as Tutorial);
  }

  public getTutorials(page: number, categoryId?: string): Observable<Tutorial[]> {
    var params = {
      page: page,
      parentCategoryId: categoryId
    };
    return this._api.get('/Tutorial/Get', params).map(x => x as Tutorial[]);
  }

  public doesTutorialExist(tutorialLinkUrl: string) {
    var params = {
      tutorialLinkUrl: tutorialLinkUrl
    };
    return this._api.get('/Tutorial/DoesTutorialExist', params);
  }

  public getTutorialWithArticleInfo(tutorialLinkUrl: string): Observable<Tutorial> {
    var params = {
      tutorialLinkUrl: tutorialLinkUrl
    };
    return this._api.get('/Tutorial/GetTutorialWithArticleInfo', params).map(x => x as Tutorial);
  }

}
