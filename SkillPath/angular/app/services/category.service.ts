import { Observable } from 'rxjs/Observable';
import { Category } from './../models/category';
import { SkillpathApiService } from './../skillpath-api.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private _api: SkillpathApiService ) { 
   
  }

  public getCategories(tier: number) : Observable<Category[]> {
    let params = {
      'tier': tier
    };
   
    return this._api.get('/categories', params)
      .map(categories => categories as Category[]);
  }
  
  

}
