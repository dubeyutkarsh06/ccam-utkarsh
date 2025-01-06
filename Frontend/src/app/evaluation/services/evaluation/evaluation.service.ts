import {Injectable} from '@angular/core';
import {HttpService} from '../../../shared/services/http/http.service';
import {QuestionService} from '../../../question/services/question/question.service';
import {Question} from 'src/app/shared/models/question/question';
import {AssessmentFinish} from '../../../shared/models/response/assessmentFinish';
import {RecordTranslation} from '../../../shared/models/response/recordTranslation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  public scoring = {};
  public feedback = {};
  public assessmentFinish: AssessmentFinish;
  public categories: string[];
  public chartCategories: string[];
  public questions: Question[];

  constructor(
    private httpService: HttpService,
    private questionService: QuestionService,
  ) { }

  /**
   * Init evaluation data
   */
  public async initialize() {
    const score = await this.httpService.getScoring(this.questionService.getQuestions()).toPromise();

    this.categories = await this.httpService.getScoringCategories().toPromise();
    this.chartCategories = await this.httpService.getChartScoringCategories().toPromise();
    this.scoring = this.normalizeScore(100, score);
    this.feedback = await this.httpService.getFeedback(score).toPromise();
    this.assessmentFinish = await this.httpService.getAssessmentFinish().toPromise();
    if (this.assessmentFinish.explanation.length > 0) {
      this.addLineBreak();
    }
    this.questions = this.questionService.getQuestions();
  }

  /**
   * Normalize all scores to maxScore
   * @param maxScore Maximum reachable score
   * @param scoringObject Object containing the scores per category
   */
  public normalizeScore(maxScore: number, scoringObject) {
    const tmp = {};
    for (const item of Object.keys(scoringObject)) {
      const factor = maxScore / scoringObject[item].maxScore;
      tmp[item] = scoringObject[item].score * factor > 100 ? 100 : scoringObject[item].score * factor;
    }
    return tmp;
  }

  private addLineBreak() {
    if (this.assessmentFinish.explanation[0].length !== 0) {
      const pattern = /\\n/g;
      this.assessmentFinish.explanation[0] = this.assessmentFinish.explanation[0].replace(pattern, '<br /><br />');
    }
  }
  public async getScoringCategoryTranslation(category) {
    return await this.httpService.getScoringCategoryTranslation(category).toPromise();
  }
  public async getRecordTranslation(data, language): Promise<RecordTranslation[]> {
    return await this.httpService.getRecordTranslation(data, language).toPromise();
  }
}
