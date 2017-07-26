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
    let definedCategories = categories.filter(x => x && x.id);
    if (definedCategories.length > 0) {
      toReturn = definedCategories[definedCategories.length - 1];
    }
    return toReturn;
  }

  getAngularCategories(): any {
    return [ { "name": "Frontend", "description": "Web frameworks, libraries, html, css, etc.", "icon": "display", "tier": 1, "parent": null, "parentId": null, "tutorialCategories": null, "tutorialCount": 0, "id": "4660524d-d886-4910-afb8-08d48a9f2868", "dateCreated": "0001-01-01T00:00:00" }, { "name": "Web Frameworks", "description": "Front-end web frameworks", "icon": "books", "tier": 2, "parent": null, "parentId": "4660524d-d886-4910-afb8-08d48a9f2868", "tutorialCategories": null, "tutorialCount": 0, "id": "c89f80ab-0edc-40fb-4559-08d4a6d6c475", "dateCreated": "0001-01-01T00:00:00" }, { "name": "Angular 2.x+", "description": "Two-way data binding framework from Google", "icon": "angular.path1.path2.path3", "tier": 3, "parent": null, "parentId": "c89f80ab-0edc-40fb-4559-08d4a6d6c475", "tutorialCategories": null, "tutorialCount": 0, "id": "3fcd8c3d-928e-4dae-85e3-08d4a6d81c20", "dateCreated": "0001-01-01T00:00:00" }, null ];
  }

  public getCategories(tier: number, getEmpty: boolean = false): Observable<Category[]> {
    let params = {
      'tier': tier
    };
    if (getEmpty) {
      params['getEmpty'] = "true";
    }
    // TODO: Figure out why in-memory doesn't work for first tier
    let inMemoryCategories = this.getCategoriesFromMemory(tier, getEmpty);
    if (inMemoryCategories) {
      return Observable.of(inMemoryCategories).map(cat => { return cat as Category[] });
    }
    else {
      return this._api.get('/category/find', params)
        .map(categories => {
          return categories = this.mapAsCategories(tier, categories, getEmpty);
        });
    }
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
      let uniqueKey = this.getCategoryKey(key.toString(), getEmpty);
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
