import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/shared/services/language/language.service';
import {SwitchService} from "../../../shared/services/language/switch.service";


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  public selectedLanguage: string;
  public classes: string;
  public languages;

  constructor(public languageService: LanguageService, private switchService: SwitchService) { }

  ngOnInit() {
    this.languageService.$language.subscribe((value) => {
      this.selectedLanguage = value;
    });
    this.languageService.$classes.subscribe((value) => {
      this.classes = value;
    });
    this.languages = this.languageService.languages;
  }

  updateModel(selectedLanguage: string) {
    this.switchService.switchLanguage(selectedLanguage);
  }
}
