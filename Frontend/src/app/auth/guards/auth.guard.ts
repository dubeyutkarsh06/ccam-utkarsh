import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {LanguageService} from '../../shared/services/language/language.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private languageService: LanguageService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('accessToken') && (sessionStorage.getItem('isLoggedIn') === 'true')) {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/' + this.languageService.getLanguage() + '/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
