import {Injectable} from '@nestjs/common';
import {LanguageService} from '../../shared/language/language.service';
import {SectionService} from '../../shared/section/section.service';
import {CategoryService} from '../../shared/category/category.service';
import {QuestionService} from '../../shared/question/question.service';
import {ScoringCategoryService} from '../../scoring/service/scoringCategory/scoringCategory.service';

@Injectable()
export class NavigationService {
    constructor(
        private languageService: LanguageService,
        private sectionService: SectionService,
        private categoryService: CategoryService,
        private questionService: QuestionService,
        private scoringCategoryService: ScoringCategoryService,
    ) {
    }

    public async getAllCategories(language: string) {
        const languageId = (await this.languageService.getLanguageId(language)).id;
        const activeSectionId = (await this.sectionService.getActiveSectionId()).id;
        const questionIds = (await this.questionService.getSectionQuestions(activeSectionId)).map(q => q.id);
        return {
            categories: (await this.categoryService.getQuestionCategories(questionIds, languageId)).map(ct => ct.translationShort),
            title: await this.categoryService.getNavigationTranslation(languageId, 'title'),
            start_text: await this.categoryService.getNavigationTranslation(languageId, 'start_text'),
            result_text: await this.categoryService.getNavigationTranslation(languageId, 'result_text'),
            imprint: await this.categoryService.getNavigationTranslation(languageId, 'imprint'),
            data_privacy: await this.categoryService.getNavigationTranslation(languageId, 'data_privacy'),
        };
    }

    public async getScoringCategories(language: string) {
        const languageId = (await this.languageService.getLanguageId(language)).id;
        const activeSectionId = (await this.sectionService.getActiveSectionId()).id;
        const questionIds = (await this.questionService.getSectionQuestions(activeSectionId)).map(q => q.id);
        return (await this.scoringCategoryService.getScoringCategories(questionIds, languageId)).map(x => x.value);
    }

    public async getChartScoringCategories(language: string) {
        const languageId = (await this.languageService.getLanguageId(language)).id;
        const activeSectionId = (await this.sectionService.getActiveSectionId()).id;
        const questionIds = (await this.questionService.getSectionQuestions(activeSectionId)).map(q => q.id);
        return (await this.scoringCategoryService.getScoringCategories(questionIds, languageId)).filter(x => x.type == "CHART").map(x => x.value);
    }

}
