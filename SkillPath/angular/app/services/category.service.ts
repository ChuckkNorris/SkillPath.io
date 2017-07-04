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
    return this._api.get('/category/find', params)
      .map(categories => {
        return this.mapAsCategories(tier, categories, getEmpty);
      });
  }

  public getChildCategories(selectedCategoryId: string, getEmpty: boolean = false) : Observable<Category[]> {
    let params = {
      'selectedCategoryId': selectedCategoryId
    };
    if (getEmpty) {
      params['getEmpty'] = "True";
    }
    let uniqueKey = this.getCategoryKey(selectedCategoryId, getEmpty);
    let inMemoryCategories = this.allCategories[uniqueKey];
    
    if (inMemoryCategories)
      return Observable.create(obs => {
        console.log('GETTING IN MEMORY CATEGORIES');;
        obs.next(inMemoryCategories as Category[])
      });
    else {
      return this._api.get('/category/GetChildCategories', params)
        .map(categories => {
          
          return this.mapAsCategories(selectedCategoryId, categories, getEmpty);
        });
    }
   
  }

  allCategories = {};
  private getCategoryKey(key, getEmpty: boolean): string {
    let uniqueKey = key;
    if (getEmpty)
      uniqueKey += ':empty';
    return uniqueKey;
  }
  private mapAsCategories(key, categories: any, getEmpty?: boolean): Category[] {
   // this.storeCategoriesInMemory(key, categories);
    console.log('GETTING CATEGORIES FROM SERVER');
    let uniqueKey = this.getCategoryKey(key, getEmpty);
    this.allCategories[uniqueKey] = categories;
    return categories as Category[];
  }

  public saveCategory(category: Category) {
    return this._api.post('/category/save', category);
  }

  public updateCategory(category: Category) {
    return this._api.put('/category/update', category);
  }

  public deleteCategory(categoryId: string) {
    let body = {
      categoryId: categoryId
    };
    return this._api.post('/category/delete', body);
  }
  
  

}
