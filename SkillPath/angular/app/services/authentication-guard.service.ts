import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private _authService: AuthenticationService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        let toReturn = this._authService.isAuthenticated;
        if (!toReturn) {
            this.router.navigate(['login']);
        }
        
        return toReturn;
    }


}