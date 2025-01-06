import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AssessmentResponse } from '../../models/response/assessmentResponse';
import { environment } from '../../../../environments/environment';
import { Question } from '../../models/question/question';
import { LanguageService } from '../language/language.service';
import { UuidResponse } from '../../models/response/uuidResponse';
import { AssessmentService } from '../assessment/assessment.service';
import { Observable } from "rxjs";
import { loginResponse } from "../../models/response/loginResponse";
import { ExportData } from "../../models/export/exportData.interface";
import { ExportInterface } from "../../models/response/export.interface";
import { AssessmentFinish } from "../../models/response/assessmentFinish";
import { Navigation_response } from "../../models/response/navigation_response";
import { Intern_data } from "../../models/response/intern_data.interface";
import { RecordInterface } from "../../models/response/record.interface";
import { RecordTranslation } from "../../models/response/recordTranslation";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  protected backendUrl = environment.backendUrl;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService,
    private assessmentService: AssessmentService,
  ) { }

  /**
   * Get active questions
   * @param data data: {assessment: number, filter: number[]}
   * @param language Language String
   */
  public getAssessmentQuestions(filter: number[], language: string = this.languageService.getLanguage(),
    assessment: number = this.assessmentService.getAssessment()) {

    return this.httpClient.post<AssessmentResponse>(this.backendUrl + 'api/questions/' + language + '/' + assessment, filter);
  }

  /**
   * Get all categories
   * @param language Language String
   */
  public getCategories(language: string = this.languageService.getLanguage()) {
    return this.httpClient.get<Navigation_response>(this.backendUrl + 'api/navigation/' + language);
  }

  /**
   * Get all scoring categories
   * @param language Language String
   */
  public getScoringCategories(language: string = this.languageService.getLanguage()) {
    return this.httpClient.get<string[]>(this.backendUrl + 'api/navigation/scoring/' + language);
  }
  public getChartScoringCategories(language: string = this.languageService.getLanguage()) {
    return this.httpClient.get<string[]>(this.backendUrl + 'api/navigation/scoring/' + language + '/chart');
  }

  public getScoringDefaultCharts(language: string = this.languageService.getLanguage()) {
    return this.httpClient.get<any[]>(this.backendUrl + 'api/scoring/' + language + '/defaultCharts');
  }

  /**
   * Get final assessment text
   * @param assessment Assessment ID
   * @param language Language String
   */
  public getAssessmentFinish(assessment: number = this.assessmentService.getAssessment(),
    language: string = this.languageService.getLanguage()) {

    return this.httpClient.get<AssessmentFinish>(this.backendUrl + 'api/misc/' + language + '/' + assessment);
  }

  /**
   * Get Scores based on answered questions
   * @param questions Questions Array
   * @param assessment Assessment ID
   */
  public getScoring(questions: Question[], assessment?: number, language: string = this.languageService.getLanguage()) {
    assessment = assessment === undefined ? this.assessmentService.getAssessment() : assessment;
    return this.httpClient.post(this.backendUrl + 'api/scoring/' + language + '/' + assessment, questions);
  }

  /**
   * Update Record associated to the UUID
   * @param data Questions Array
   * @param uuid UUID String
   */
  public updateRecord(questions: Question[], uuid: string, language: string = this.languageService.getLanguage(), assessment: number = this.assessmentService.getAssessment()) {
    return this.httpClient.post(this.backendUrl + 'api/record/' + uuid + '/' + language + '/' + assessment, questions);
  }

  /**
   * Get Question data associated to the UUID
   * @param uuid UUID String
   */
  public getRecord(uuid: string) {
    return this.httpClient.get<RecordInterface>(this.backendUrl + 'api/record/' + uuid);
  }

  /**
   * Get User UUID from Backend
   */
  public getUuid(language: string = this.languageService.getLanguage(), assessment: number = this.assessmentService.getAssessment()) {
    return this.httpClient.get<UuidResponse>(this.backendUrl + 'api/record/uuid/' + language + '/' + assessment);
  }

  /**
   * Get Feedback based on calculated Score
   * @param scoring Scoring Object: {category_name: {score: number, minScore: number}}
   */
  public getFeedback(scoring, assessment: number = this.assessmentService.getAssessment()) {
    return this.httpClient.post(this.backendUrl + 'api/feedback/' + this.languageService.getLanguage() + '/' + assessment, scoring);
  }

  /**
   * Get active filters based on selected answers
   * @param questions Question Array
   */
  public getFilter(questions: Question[]) {
    return this.httpClient.post<number[]>(this.backendUrl + 'api/misc/filter', questions);
  }

  /**
   * Get active assessment based on active filters
   * @param filter Filter: number[]
   */
  public getAssessment(filter: number[]) {
    return this.httpClient.post<number>(this.backendUrl + 'api/misc/assessment', filter);
  }

  public getAssessmentId(uuid: string) {
    return this.httpClient.get<number>(this.backendUrl + 'api/misc/assessmentId/' + uuid);
  }

  /**
   * get start texts of the active language
   * @param startData
   */
  public getStartData(): Observable<Object> {
    return this.httpClient.get(this.backendUrl + 'api/start/texts/' + this.languageService.getLanguage());
  }

  /**
   * login for the intern area
   * @param userData
   */
  public login(userData) {
    return this.httpClient.post<loginResponse>(this.backendUrl + 'api/auth/login', userData);
  }

  public exportData(data: ExportData) {
    return this.httpClient.post(`${this.backendUrl}api/statistic/export`, data,
      { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` }, responseType: 'text' }, );
  }

  public getExportProgress(job_id: string) {
    return this.httpClient.get(`${this.backendUrl}api/statistic/export/progress/${job_id}`,
      { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` }, responseType: 'text'  });
  }

  public getExportedXLS(job_id: string) {
    return this.httpClient.post(`${this.backendUrl}api/statistic/export/download`, { job_id: job_id },
      { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` }, responseType: 'arraybuffer' });
  }

  public getCSV() {
    return this.httpClient.get<ExportInterface>(this.backendUrl + 'api/statistic/csv', { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` } })
  }

  public getData() {
    return this.httpClient.get<Intern_data>(this.backendUrl + 'api/statistic/data', { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` } })
  }

  public getPopUpText() {
    return this.httpClient.get<string[]>(this.backendUrl + 'api/questions/popup/' + this.languageService.getLanguage());
  }

  /**
   * get a csv string representation of the questions and selected answers for all uuids in the array.
   * @param input string array that contains all uuids the user inserted.
   */
  public getQACSVString(input: string[]) {
    return this.httpClient.post<ExportInterface>(this.backendUrl + 'api/statistic/qaExport/' + this.languageService.getLanguage(), input);
  }

  public getScoringCategoryTranslation(category: string) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post(this.backendUrl + 'api/scoring/translation', { category, language: this.languageService.getLanguage() });
  }

  public getRecordTranslation(data, recordLanguage) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<RecordTranslation[]>(this.backendUrl + 'api/record/translation/' + this.languageService.getLanguage(), { data, recordLanguage });
  }

  public getLanguages() {
    return this.httpClient.get<any[]>(this.backendUrl + 'api/statistic/languages');
  }
}
