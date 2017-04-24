import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SkillpathApiService {

  constructor(private _http: Http) { }
  private BASE_URL = "/api";

  public get(endpoint: string, queryStringParams?: { [key: string]: any }): Observable<any> {
    let fullUrl = this.constructFullUrl(endpoint, queryStringParams);
    return this._http.get(fullUrl).map(response => this.mapResponse(response));
  }

  public post(endpoint: string, body: any, queryStringParams?: { [key: string]: any }): Observable<any> {
    let fullUrl = this.constructFullUrl(endpoint, queryStringParams);
    return this._http.post(fullUrl, body).map(response => this.mapResponse(response));
  }

  public put(endpoint: string, body: any, queryStringParams?: { [key: string]: any }): Observable<any> {
    let fullUrl = this.constructFullUrl(endpoint, queryStringParams);
    return this._http.put(fullUrl, body).map(response => this.mapResponse(response));
  }

  private mapResponse(response: Response) : any {
    if (response.headers.get("content-type").startsWith("application/json")) {
      return response.json();
    }
    else {
      return response;
    }
  }

  private constructFullUrl(endpoint: string, queryStringParams?: { [key: string]: any }): string {
    let toReturn: string = this.BASE_URL;
    if (endpoint.startsWith('/') && endpoint.length > 1) {
      endpoint = endpoint.substring(1)
    }
    toReturn += '/' + endpoint;
    toReturn += this.constructQueryString(queryStringParams);
    return toReturn;

  }

  private constructQueryString(queryStringParams?: { [key: string]: any }) {
    let toReturn: string = "";
    if (queryStringParams) {
      let counter = 0;
      for (let key in queryStringParams) {
        if (queryStringParams.hasOwnProperty(key)) {
          if (counter == 0) toReturn += '?';
          else toReturn += '&'
          let param = key + '=' + queryStringParams[key];
          toReturn += param;
          counter++;
        }
      }
    }
    return toReturn;
  }



}
