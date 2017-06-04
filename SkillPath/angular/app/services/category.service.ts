import { Observable } from 'rxjs/Observable';
import { Category } from './../models/category';
import { SkillpathApiService } from './../skillpath-api.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private _api: SkillpathApiService ) { 
   
  }

  public getCategories(tier: number, getEmpty: boolean = false) : Observable<Category[]> {
    let params = {
      'tier': tier
    };
    if (getEmpty) {
      params['getEmpty'] = "true";
    }
   console.log(params);
    return this._api.get('/category/find', params)
      .map(categories => {
        console.log(categories);
        return categories as Category[]
      });
  }

  public getChildCategories(selectedCategoryId: string, getEmpty: boolean = false) : Observable<Category[]> {
    let params = {
      'selectedCategoryId': selectedCategoryId
    };
    if (getEmpty) {
      params['getEmpty'] = "True";
    }
    console.log(params);
    return this._api.get('/category/GetChildCategories', params)
      .map(categories => {
        console.log(categories);
        return categories as Category[]
      });
  }

  public saveCategory(category: Category) {
    return this._api.post('/category/save', category);
  }
  
  

}
