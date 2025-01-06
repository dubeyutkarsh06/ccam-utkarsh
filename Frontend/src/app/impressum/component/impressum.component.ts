import {Component, OnInit} from '@angular/core';
import { ImpressumService } from '../services/impressum.service';
import {LanguageService} from '../../shared/services/language/language.service';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent implements OnInit {

  public language: string;

  constructor(
    private impressumService: ImpressumService,
    public languageService: LanguageService,
  ) {
    this.language  = this.languageService.getLanguage();
  }

  ngOnInit(): void {
    this.impressumService.language$.subscribe(value => {
      this.language = value;
    });
  }

}
