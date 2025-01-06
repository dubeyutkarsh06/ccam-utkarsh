import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private location: Location,
    private router: Router
  ) { }


  private allowChange = true;

  public languages = {
    English: 'flag-icon flag-icon-gb flagToTextMargin',
    German: 'flag-icon flag-icon-de flagToTextMargin',
    // French: 'flag-icon flag-icon-fr flagToTextMargin',
    // Spanish: 'flag-icon flag-icon-es flagToTextMargin',
    // Bulgarian: 'flag-icon flag-icon-bg flagToTextMargin',
    // Romanian: 'flag-icon flag-icon-ro flagToTextMargin',
    // Polish: 'flag-icon flag-icon-pl flagToTextMargin',
    // Czech: 'flag-icon flag-icon-cz flagToTextMargin',
    // Slovak: 'flag-icon flag-icon-sk flagToTextMargin',
    // Hungarian: 'flag-icon flag-icon-hu flagToTextMargin',
    // Slovenian: 'flag-icon flag-icon-si flagToTextMargin',
    // Italian: 'flag-icon flag-icon-it flagToTextMargin',
    // Croatian: 'flag-icon flag-icon-hr flagToTextMargin',
    // Turkish: 'flag-icon flag-icon-tr flagToTextMargin',
  };

  private language = new BehaviorSubject<string>('English');
  public $language = this.language.asObservable();

  private classes = new BehaviorSubject<string>(this.languages.English);
  public $classes = this.classes.asObservable();

  public getLanguage() {
    return this.language.getValue();
  }

  public setLanguage(language: string) {
    this.language.next(language);
  }

  public getChangeBoolean() {
    return this.allowChange;
  }

  public setChangeBoolean(value: boolean) {
    this.allowChange = value;
  }

  public updateLanguage(selectedLanguage: string) {
    this.classes.next(this.languages[selectedLanguage]);
    this.setLanguage(selectedLanguage);
  }

  public switchLanguage(selectedLanguage: string) {
    if (!this.containsLanguage(selectedLanguage)) { // selectedLanguage is a valid language
      this.classes.next(this.languages[selectedLanguage]);
      this.setLanguage(selectedLanguage);
      this.setURL();
    } else { // selectedLanguage is not a valid language
      this.classes.next(this.languages['English']);
      this.setLanguage('English');
      this.setURL();
    }
  }

  private setURL() {
    if (this.containsLanguage(this.location.path())) { // URL contains a valid language
      this.router.navigateByUrl('/' + this.getLanguage() + '/start');
    }
  }

  private containsLanguage(url: string) {
    const languages = Object.keys(this.languages);
    let result = true;
    for (let i = 0; i < languages.length; i++) {
      if (url.includes(languages[i]) || url.includes(languages[i].toLowerCase())) {
        result = false;
        break;
      }
    }
    return result;
  }
}
