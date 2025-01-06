import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../../models/question/question';
import {LanguageService} from "../language/language.service";

@Injectable({
    providedIn: 'root'
})
export class RouterService {

    constructor(
        private readonly router: Router,
        private languageService: LanguageService,
    ) { }

    public updateRouter(question: Question) {
        if (this.router.url !== '/' + this.languageService.getLanguage() + '/questions/' + question.category.replace(/ /g, '')) {
            this.router.navigateByUrl('/' + this.languageService.getLanguage() + '/questions/' + question.category.replace(/ /g, ''));
        }
    }

    public getEvaluation() {
        this.router.navigateByUrl('/' + this.languageService.getLanguage() + '/results');
    }
}
