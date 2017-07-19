import { Observable } from 'rxjs/Observable';
import { Category } from './../models/category';
import { SkillpathApiService } from './../skillpath-api.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private _api: SkillpathApiService) {

  }

  getUpdatedCategory(categories: Category[]) {
    let toReturn;
    let definedCategories = categories.filter(x => x);
    if (definedCategories.length > 0) {
      toReturn = definedCategories[definedCategories.length - 1];
    }
    return toReturn;
  }

  public getCategories(tier: number, getEmpty: boolean = false): Observable<Category[]> {
    let params = {
      'tier': tier
    };
    if (getEmpty) {
      params['getEmpty'] = "true";
    }
    // TODO: Figure out why in-memory doesn't work for first tier
    // let inMemoryCategories = this.getCategoriesFromMemory(tier, getEmpty);
    // console.log('From First Tier CatService');
    // console.log(inMemoryCategories);
    // if (inMemoryCategories) {
    //   console.log('From Memory TIER');
    //   return Observable.of(inMemoryCategories).map(cat => {return cat as Category[]});
      
    // }
    //  else {
      return this._api.get('/category/find', params)
      .map(categories => {
        return categories as Category[]; // this.mapAsCategories(tier, categories, getEmpty);
      });
    //}
  }

  public getChildCategories(selectedCategoryId: string, getEmpty: boolean = false): Observable<Category[]> {
    let params = {
      'selectedCategoryId': selectedCategoryId
    };
    if (getEmpty) {
      params['getEmpty'] = "True";
    }

    let inMemoryCategories = this.getCategoriesFromMemory(selectedCategoryId, getEmpty);
    if (inMemoryCategories) {
      return Observable.of(inMemoryCategories as Category[]);
    }
    else {
      return this._api.get('/category/GetChildCategories', params)
        .map(categories => {

          return this.mapAsCategories(selectedCategoryId, categories, getEmpty);
        });
    }

  }

  private getCategoriesFromMemory(key, getEmpty) {
    let toReturn;
    if (key) {
      let uniqueKey = this.getCategoryKey(key, getEmpty);
      let inMemoryCategories = this.allCategories[uniqueKey];
      if (inMemoryCategories)
        toReturn = inMemoryCategories;
    }
    return toReturn;
  }

  allCategories = {};
  private getCategoryKey(key, getEmpty: boolean): string {
    let uniqueKey = key;
    if (getEmpty)
      uniqueKey += '-empty';
    return uniqueKey;
  }
  private mapAsCategories(key, categories: any, getEmpty?: boolean): Category[] {
    if (key && key != '00000000-0000-0000-0000-000000000000') {
      let uniqueKey = this.getCategoryKey(key, getEmpty);
      this.allCategories[uniqueKey] = categories;
    }
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
