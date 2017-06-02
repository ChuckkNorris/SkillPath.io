import { Observable } from 'rxjs/Observable';
import { Category } from '../category';
import { SkillpathApiService } from '../../shared/services/skillpath-api.service';
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
   
    return this._api.get('/category/find', params)
      .map(categories => {
        console.log(categories);
        return categories as Category[]
      });
  }

  public getChildCategories(selectedCategoryId: string) : Observable<Category[]> {
    let params = {
      'selectedCategoryId': selectedCategoryId
    };
   
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
