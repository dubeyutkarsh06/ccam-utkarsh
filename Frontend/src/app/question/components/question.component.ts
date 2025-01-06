import {Component, OnInit, ViewChild} from '@angular/core';
import {Question} from 'src/app/shared/models/question/question';
import {QuestionCheckboxComponent} from './question-checkbox/question-checkbox.component';
import {QuestionRadioComponent} from './question-radio/question-radio.component';
import {QuestionFreeComponent} from './question-free/question-free.component';
import {QuestionService} from '../services/question/question.service';
import {QuestionDropdownComponent} from './question-dropdown/question-dropdown.component';
import {QuestionSubcomponent} from './models/question-subcomponent';
import {MatDialog} from '@angular/material';
import {UuidDialogComponent} from '../dialogs/uuid-dialog/uuid-dialog.component';
import {UuidService} from 'src/app/shared/services/uuid/uuid.service';
import {HttpService} from 'src/app/shared/services/http/http.service';
import {ProgressbarService} from '../services/progressbar/progressbar.service';
import {ComponentTranslation} from "../../shared/models/question/componentTranslation";
import {LanguageService} from "../../shared/services/language/language.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @ViewChild(QuestionCheckboxComponent) checkboxChild: QuestionCheckboxComponent;
  @ViewChild(QuestionRadioComponent) radioChild: QuestionRadioComponent;
  @ViewChild(QuestionFreeComponent) freeChild: QuestionFreeComponent;
  @ViewChild(QuestionDropdownComponent) dropdownChild: QuestionDropdownComponent;

  public progressBarData: number;

  public currentQuestion: Question;

  public isNotLastQuestion: boolean;

  public questionIndex: number;

  public questionTranslationData: ComponentTranslation;

  constructor(
    private questionService: QuestionService,
    private uuidService: UuidService,
    private httpService: HttpService,
    private progressbarService: ProgressbarService,
    private dialog: MatDialog,
    private languageService: LanguageService,
  ) {
  }

  public ngOnInit() {
    this.showDialog();

    this.questionService.currentQuestion$.subscribe(question => {
      this.currentQuestion = question;

      if (question !== null) {
        this.progressBarData = this.progressbarService.getProgressBarPartial();
      }

      this.languageService.setChangeBoolean(false);
    });

    this.questionService.isNotLastQuestion$.subscribe(notLastQuestion => {
      this.isNotLastQuestion = notLastQuestion
    });
    this.questionService.questionIndex$.subscribe(questionIndex => {
      this.questionIndex = questionIndex;
    });

    this.questionService.questionComponentTranslations$.subscribe(translations => {
      this.questionTranslationData = translations;
    });
  }

  private async showDialog() {
    if (!this.questionService.dialogOpened) {
      const uuid = (await this.httpService.getUuid().toPromise()).uuid;
      const popUpText = await this.httpService.getPopUpText().toPromise();
      this.uuidService.setUuid(uuid);
      this.dialog.open(UuidDialogComponent, {width: '500px', height: '300px', data: {uuid: uuid, text: popUpText[0]}});
      this.questionService.dialogOpened = true;
    }
  }

  public getActiveChild(): QuestionSubcomponent {
    switch (this.currentQuestion.type) {
      case 'checkbox':
        return this.checkboxChild;
      case 'radio':
        return this.radioChild;
      case 'text':
        return this.freeChild;
      case 'text+pie':
        return this.freeChild;
      case 'dropdown':
        return this.dropdownChild;
      default:
        return undefined;
    }
  }

  public navClick(event: string): void {
    event === 'last' ? this.navClickLast() : this.navClickNext();
  }

  private navClickLast() {
    this.questionService.getLastQuestion();
  }

  private async navClickNext() {
    if (this.currentQuestion.type != 'instruction') {
      const answer = await this.getActiveChild().getModel();

      if (this.currentQuestion.mandatory === 0 || answer.length !== 0) {
        this.currentQuestion.selectedAnswers = answer;
        await this.questionService.getNextQuestion();
      }
    } else {
      await this.questionService.getNextQuestion();
    }
  }
}
