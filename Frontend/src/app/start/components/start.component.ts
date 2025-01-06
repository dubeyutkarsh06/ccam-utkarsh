import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../../question/services/question/question.service';
import {RouterService} from '../../shared/services/router/router.service';
import {UuidService} from '../../shared/services/uuid/uuid.service';
import {HttpService} from '../../shared/services/http/http.service';
import {FilterService} from '../../question/services/filter/filter.service';
import {AssessmentService} from '../../shared/services/assessment/assessment.service';
import {StartService} from '../services/start.service';
import {LanguageService} from '../../shared/services/language/language.service';
import {SwitchService} from '../../shared/services/language/switch.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public startData;

  constructor(
    private routerService: RouterService,
    private questionService: QuestionService,
    private uuidService: UuidService,
    private httpService: HttpService,
    private filterService: FilterService,
    private assessmentService: AssessmentService,
    private startService: StartService,
    private languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private switchService: SwitchService,
  ) {
  }

  async ngOnInit() {
    await this.startService.initialize();
    this.startService.startData$.subscribe(data => {
      this.startData = data;
    });
    this.languageService.setChangeBoolean(true);
  }

  public async reloadUserData(token: string) {
    const record = await this.httpService.getRecord(token).toPromise();
    const questions = record.record;
    const language = record.language.name.charAt(0).toUpperCase() + record.language.name.slice(1);
    await this.switchService.switchLanguageReload(language);
    this.uuidService.setUuid(token);
    this.questionService.setQuestions(questions);
    this.questionService.dialogOpened = true;

    const filter = await this.httpService.getFilter(questions).toPromise();
    this.filterService.setFilter(filter);

    const assessment = await this.httpService.getAssessmentId(token).toPromise();
    this.assessmentService.setAssessment(assessment);

    this.updateRouter();
  }

  public updateRouter(): void {
    this.languageService.setChangeBoolean(false);
    this.routerService.updateRouter(this.questionService.getCurrentQuestion());
  }
}
