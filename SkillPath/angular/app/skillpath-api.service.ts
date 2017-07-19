import { CREDENTIALS } from '../../credentials/credentials';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SkillpathApiService {

  constructor(private _http: Http) { }
  private BASE_URL = "/api";

  public get(endpoint: string, queryStringParams?: { [key: string]: any }): Observable<any> {
    let fullUrl = this.constructFullUrl(endpoint, queryStringParams);
    console.log(fullUrl);
    return this._http.get(fullUrl, this.getRequestOptions()).map(response => this.mapResponse(response))
    .catch(err => this.handleError(err));
  }

  public post(endpoint: string, body: any, queryStringParams?: { [key: string]: any }): Observable<any> {
    let fullUrl = this.constructFullUrl(endpoint, queryStringParams);
    return this._http.post(fullUrl, body, this.getRequestOptions()).map(response => this.mapResponse(response))
    .catch(err => this.handleError(err));
  }

  public put(endpoint: string, body: any, queryStringParams?: { [key: string]: any }): Observable<any> {
    let fullUrl = this.constructFullUrl(endpoint, queryStringParams);
    return this._http.put(fullUrl, body, this.getRequestOptions()).map(response => this.mapResponse(response))
    .catch(err => this.handleError(err));
  }

  private mapResponse(response: Response) : any {
    if (response.status == 200) {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.startsWith("application/json")) {
        return response.json();
      }
      else
        return {};
    }
    else {
      return {};
    }
  }

  handleError(error: Response) : Observable<any> {
    let errorMessage = `${error.status} - `;
    if (error.status > 500)
      errorMessage += `Sorry, an error occurred on the server`;
    else if (error.status == 401)
      errorMessage += `You do not have permission to access this endpoint`;
    return Observable.throw(errorMessage);
  }

  private getRequestOptions(): RequestOptionsArgs {
    let toReturn: RequestOptionsArgs = {};
    let headers = new Headers();
    let authValue = btoa(CREDENTIALS.username + ":" + CREDENTIALS.password);
    headers.append("Authorization", 'Basic ' + authValue);
    toReturn.headers = headers;

    return toReturn;
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
