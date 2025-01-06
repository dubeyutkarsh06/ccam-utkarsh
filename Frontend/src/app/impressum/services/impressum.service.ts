import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ImpressumService {
  private language = new BehaviorSubject<string>('English');
  public language$ = this.language.asObservable();

  constructor() { }

  public setLanguage(value: string) {
    this.language.next(value);
  }
}
