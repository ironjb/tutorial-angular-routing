import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Router, Route } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkedLoggedIn(state.url);
    }

    canLoad(route: Route): boolean {
        return this.checkedLoggedIn(route.path);
    }

    checkedLoggedIn(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}
