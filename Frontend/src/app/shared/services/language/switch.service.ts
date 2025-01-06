import {Injectable} from '@angular/core';
import {QuestionService} from "../../../question/services/question/question.service";
import {NavigationService} from "../../../navigation/servies/navigation.service";
import {StartService} from "../../../start/services/start.service";
import {ImpressumService} from "../../../impressum/services/impressum.service";
import {LanguageService} from "./language.service";


@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  constructor(
    private navigationService: NavigationService,
    private questionService: QuestionService,
    private startService: StartService,
    private impressumService: ImpressumService,
    private languageService: LanguageService,
  ) { }

  public switchLanguage(language: string) {
    this.languageService.updateLanguage(language);
    this.navigationService.getCategories();
    this.questionService.switchLanguage();
    this.startService.initialize();
    this.impressumService.setLanguage(language);
  }

  public switchLanguageReload(language: string) {
    this.languageService.updateLanguage(language);
    this.navigationService.getCategories();
    this.startService.initialize();
    this.impressumService.setLanguage(language);
  }

}
