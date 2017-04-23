import { SkillpathApiService } from './../skillpath-api.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private _api: SkillpathApiService ) { 
    let params = {
      'test': 'myValue'
    };
   
    _api.get('/hello', params)
  }

  
  

}
