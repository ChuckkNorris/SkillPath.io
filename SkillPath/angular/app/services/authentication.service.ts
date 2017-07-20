import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { FRONTEND_CREDENTIALS } from "../../../credentials/credentials";

const BEARER_TOKEN = 'bearer_token';

@Injectable()
export class AuthenticationService {

    constructor(
        private _cookieService: CookieService
    ) {}

    private _isAuthenticated : boolean;
    public get isAuthenticated() : boolean {
        return this._cookieService.get(BEARER_TOKEN) == 'tokenHere';
    }
    
    public login(username: string, password: string) {
        if (username == FRONTEND_CREDENTIALS.username && password == FRONTEND_CREDENTIALS.password) {
            this._isAuthenticated = true;
            this._cookieService.set(BEARER_TOKEN, 'tokenHere');
        }
        return this.isAuthenticated;
    }

}