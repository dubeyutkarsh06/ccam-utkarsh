import {Injectable} from '@angular/core';
import {Question} from '../../../shared/models/question/question';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpService} from '../../../shared/services/http/http.service';
import {FilterService} from '../filter/filter.service';
import {AssessmentService} from '../../../shared/services/assessment/assessment.service';
import {RouterService} from '../../../shared/services/router/router.service';
import {UuidService} from 'src/app/shared/services/uuid/uuid.service';
import {ComponentTranslation} from "../../../shared/models/question/componentTranslation";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private allQuestions: Question[] = [];

  private questionIndex = new BehaviorSubject<number>(-1);
  public questionIndex$ = this.questionIndex.asObservable();

  private isNotLastQuestion = new BehaviorSubject<boolean>(true);
  public isNotLastQuestion$ = this.isNotLastQuestion.asObservable();

  private currentQuestion = new BehaviorSubject<Question>(null);
  public currentQuestion$ = this.currentQuestion.asObservable();

  private questionComponentTranslations = new BehaviorSubject<ComponentTranslation>(null);
  public questionComponentTranslations$ = this.questionComponentTranslations.asObservable();

  public dialogOpened = false;

  constructor(
    private httpService: HttpService,
    private routerService: RouterService,
    private filterService: FilterService,
    private assessmentService: AssessmentService,
    private uuidService: UuidService,
  ) {
  }

  /**
   * Get active questions based on filters
   * Initialize service components
   */
  public async initialize(): Promise<void> {
    const response = await this.httpService.getAssessmentQuestions(this.filterService.getFilter()).toPromise();
    if (response.questions !== null) {
      if (await this.checkDuplicate(this.allQuestions, response.questions)) {
        this.allQuestions = this.allQuestions.concat(response.questions);
        this.questionComponentTranslations.next(response.questionTranslationData);
        this.assessmentService.setAssessment(response.assessment);
        this.questionIndex.next(this.questionIndex.value + 1);
        this.checkForLastQuestion();
        this.currentQuestion.next(this.allQuestions[this.questionIndex.value]);
        this.addLineBreak();
      }
    } else {
      this.routerService.getEvaluation();
    }
  }

  /**
   * Update Filter
   * Update Record (backend)
   * Update Router
   * Set next question
   */
  public getNextQuestion(): void {
    console.log(this.questionIndex.value);
    console.log(this.allQuestions);
    this.filterService.updateFilter(this.allQuestions[this.questionIndex.value]);
    this.httpService.updateRecord(this.allQuestions, this.uuidService.getUuid()).toPromise();

    
    if (this.questionIndex.value < this.allQuestions.length - 1) {
      this.questionIndex.next(this.questionIndex.value + 1);
      if (!this.filterService.activeFilterIncludes(this.allQuestions[this.questionIndex.value])) {
        this.getNextQuestion();
        return;
      }

      this.currentQuestion.next(this.allQuestions[this.questionIndex.value]);
      this.addLineBreak();
      this.routerService.updateRouter(this.getCurrentQuestion());
    } else {
      this.initialize();
    }
  }

  /**
   * Remove Filter
   * Update Router
   * Set next question
   */
  public getLastQuestion(): void {
    console.log(this.questionIndex.value);
    console.log(this.allQuestions);
    if (this.questionIndex.value > 0) {
      this.questionIndex.next(this.questionIndex.value - 1);
      if (!this.filterService.activeFilterIncludes(this.allQuestions[this.questionIndex.value])) {
        this.getLastQuestion();
        return;
      }
      this.currentQuestion.next(this.allQuestions[this.questionIndex.value]);
      this.filterService.removeFilter(this.getCurrentQuestion());
      this.routerService.updateRouter(this.getCurrentQuestion());
    }
  }

  /**
   * Set next question based on index
   * @param index Question Index
   */
  public setNextQuestion(index: number) {
    this.questionIndex.next(index);
    this.currentQuestion.next(this.allQuestions[index]);
  }

  public getCurrentQuestion(): Question {
    this.checkForLastQuestion();
    console.log(this.currentQuestion);
    return this.currentQuestion.value;
  }

  public getQuestions(): Question[] {
    return this.allQuestions;
  }

  public getQuestionIndex(): number {
    return this.questionIndex.value;
  }

  public setQuestions(questions: Question[]): void {
    this.allQuestions = questions;
    this.questionIndex.next(0);
    this.currentQuestion.next(this.allQuestions[0]);
  }

  public checkForLastQuestion(): void {
    if (this.questionIndex.value === this.allQuestions.length - 1) {
      this.isNotLastQuestion.next(false);
    } else {
      if (!this.isNotLastQuestion.value) {
        this.isNotLastQuestion.next(true);
      }
    }
  }

  private addLineBreak() {
    if (this.currentQuestion.value.subTitle.length !== 0) {
      const pattern = /\\n/g;
      this.currentQuestion.value.subTitle = this.currentQuestion.value.subTitle.replace(pattern, '<br/><br/>');
    } else {
      return "";
    }
  }

  public switchLanguage() {
    this.allQuestions = [];
    this.initialize();
  }
  private checkDuplicate(array1: Question[], array2: Question[]) {
    for (const key in array2) {
      const element = array2[key];
      for (const key2 in array1) {
        const elem = array1[key2];
        if (elem.id === element.id) {
          return false;
        }
      }
    }
    return true;
  }
}
