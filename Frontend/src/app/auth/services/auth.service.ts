import {Injectable} from '@angular/core';
import { HttpService } from '../../shared/services/http/http.service';
import { Router } from '@angular/router';
import {loginResponse} from '../../shared/models/response/loginResponse';
import {BehaviorSubject} from 'rxjs';
import {LanguageService} from '../../shared/services/language/language.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private wrongPW = new BehaviorSubject(false);
  public wrongPW$ = this.wrongPW.asObservable();

  constructor(
    private httpService: HttpService,
    private router: Router,
    private languageService: LanguageService,
  ) { }

  public async login(userData) {
    const res: loginResponse = await this.httpService.login(userData).toPromise();
    if (res && res.accessToken) {
      sessionStorage.setItem('accessToken', res.accessToken);
      sessionStorage.setItem('isLoggedIn', 'true');
      await this.router.navigate(['/' + this.languageService.getLanguage() + '/intern']);
    }
  }

  private reset() {
    sessionStorage.clear();
    if (this.wrongPW) {
      this.wrongPW.next(false);
    }
  }

  public unauthorized() {
    this.wrongPW.next(true);
  }
}
