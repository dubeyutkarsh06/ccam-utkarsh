import { Injectable } from '@angular/core';
import { QuestionService } from 'src/app/question/services/question/question.service';
import { Question } from 'src/app/shared/models/question/question';
import {BehaviorSubject} from "rxjs";
import { HttpService } from "../../shared/services/http/http.service";
import {Navigation_response} from "../../shared/models/response/navigation_response";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

  private categories = new BehaviorSubject<Navigation_response>(null);
  public categories$ = this.categories.asObservable();

    constructor(
        private questionService: QuestionService,
        private httpService: HttpService,
    ) { }

    /**
     * Change active quesiton to the first question of type category
     * @param category Desired Category
     */
    public changeCategory(category: string, questions: Question[] = this.questionService.getQuestions()): void {
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].category === category) {
                this.questionService.setNextQuestion(i);
                return;
            }
        }
    }

    /**
     * Check whether the first question from category was already answered
     * @param category Desired Category
     */
    public categoryVisited(category: string, questions: Question[] = this.questionService.getQuestions()): boolean {
        for (const question of questions) {
            if (question.category === category) {
                return true;
                // return question.selectedAnswers.length !== 0;
            }
        }
    }

    public async getCategories() {
      this.categories.next(await this.httpService.getCategories().toPromise());
    }

    public initializeQuestions() {
      this.questionService.initialize();
    }
}
