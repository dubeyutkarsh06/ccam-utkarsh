// @ts-ignore
import { Injectable } from '@nestjs/common';
import { IQuestion } from '../../models/interfaces/question.interface';
import { QuestionService } from '../../shared/question/question.service';
import { AnswerService } from '../../shared/answer/answer.service';
import { LanguageService } from '../../shared/language/language.service';
import { AssessmentService } from '../../shared/assessment/assessment.service';
import { CalculationService } from './calculation/calculation.service';
import { ScoringCategoryService } from './scoringCategory/scoringCategory.service';
import { ScoringRequirementService } from './scoringRequirement/scoringRequirement.service';
import { Score } from '../../models/interfaces/score.interface';
import { FilterService } from '../../misc/service/filter/filter.service';
import {CategoryService} from '../../shared/category/category.service';
import {RequestObjectScoringCategoryTranslation} from '../../models/interfaces/requestObjectScoringCategoryTranslation';

@Injectable()
export class ScoringService {
    constructor(
        private questionService: QuestionService,
        private answerService: AnswerService,
        private languageService: LanguageService,
        private assessmentService: AssessmentService,
        private calculationSerice: CalculationService,
        private scoringCategoryService: ScoringCategoryService,
        private scoringRequirementService: ScoringRequirementService,
        private filterService: FilterService,
        private categoryService: CategoryService,
    ) { }

    public async getScoring(questions: IQuestion[], language: string, assessmentId: number) {
        if (assessmentId === -1) {
            assessmentId = await this.assessmentService.getAssessmnet(this.filterService.getFilter(questions), assessmentId);
        }

        questions = questions.filter(q => q.selectedAnswers.length !== 0 && !(q.type.includes('text')));
        const languageId = (await this.languageService.getLanguageId(language)).id;
        const categories = [];
        let scoring = {};
        for (const question of questions) {
            const answerIds = (await this.answerService.getAnswerIdByString(question.selectedAnswers, question.id, languageId)).map(a => a.id);
            const scoringTypeId = (await this.questionService.getQuestionScoringInformation(question.id)).scoringType.id;
            const scoringCategories = await this.scoringCategoryService.getScoringCategory(question.id, answerIds, assessmentId);
            const scores: Score[] = await this.calculationSerice.calculateScore(question.id, answerIds, assessmentId, scoringTypeId);
            scoringCategories.forEach(sc => categories.push(sc.id));

            // Add calculated scores to scoring
            for (const score of scores) {
                if (scoring[score.category] === undefined) {
                    const maxScore = (await this.scoringRequirementService.getMaxScore(assessmentId, +score.category)).maxScore;
                    scoring[score.category] = { score: +score.score, feedback: {}, maxScore };
                } else {
                    scoring[score.category].score = +scoring[score.category].score + +score.score;
                }
            }
        }

        // remove categories which don't meet the requirements
        scoring = await this.removeUnscorableCategories(scoring, (await this.getScorableCategories(categories, assessmentId)).map(c => c.id));

        // Return scoring with actual names instead of ids
        return await this.renameScoringKeys(scoring, (await this.languageService.getLanguageId(language)).id);
    }

    private async renameScoringKeys(scoring: {}, languageId: number) {
        const tmp = {};
        for (const item of Object.keys(scoring)) {
            const category = (await this.scoringCategoryService.getScoringCategoryTranslationByCategory(+item, languageId));
            tmp[category] = scoring[item];
        }
        return tmp;
    }

    private removeUnscorableCategories(scoring: {}, categories: number[]) {
        const tmp = {};
        for (const category in scoring) {
            if (categories.includes(+category)) {
                tmp[category] = scoring[category];
            }
        }
        return tmp;
    }

    private async getScorableCategories(categories: number[], assessmentId: number) {
        const counts = {};
        const scorableCategories = [];
        categories.forEach(el => counts[el] = 1 + (counts[el] || 0));
        for (const item of Object.keys(counts)) {
            const scoringRequirement = await this.scoringRequirementService.checkScoringCondition({ category: item, questions: counts[item] },
                                                                                                                                 assessmentId);
            if (scoringRequirement !== undefined) {
                scorableCategories.push(scoringRequirement.category);
            }
        }
        return scorableCategories;
    }
    public async getScoringCategoryTranslation(data: RequestObjectScoringCategoryTranslation) {
        // tslint:disable-next-line:max-line-length
        return {category: await this.categoryService.getScoringTranslation((await this.categoryService.getScoringCategoryByString(data.category)).id, (await this.languageService.getLanguageId(data.language)).id)};
    }

    public async getScoringDefaultChart(language: string) {
        const languageId = (await this.languageService.getLanguageId(language)).id;
        return this.scoringCategoryService.getDefaultCharts(languageId);
    }
}
