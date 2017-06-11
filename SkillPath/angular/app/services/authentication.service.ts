import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthenticationService {
    
    private _isAuthenticated : boolean;
    public get isAuthenticated() : boolean {
        return this._isAuthenticated;
    }
    
    public login(username: string, password: string) {
        if (username == "commander" && password == "cobra1234") {
            this._isAuthenticated = true;
        }
        return this.isAuthenticated;
    }

}