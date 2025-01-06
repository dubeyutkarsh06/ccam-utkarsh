import {Injectable} from '@nestjs/common';
import {SectionService} from '../../shared/section/section.service';
import {LanguageService} from '../../shared/language/language.service';
import {QuestionService} from '../../shared/question/question.service';
import {CategoryService} from '../../shared/category/category.service';
import {AnswerService} from '../../shared/answer/answer.service';
import {FilteraddService} from '../../shared/filteradd/filteradd.service';
import {IQuestion} from '../../models/interfaces/question.interface';
import {Answer} from '../../models/entities/answer.entity';

@Injectable()
export class QuestionsService {
    constructor(
        private sectionService: SectionService,
        private languageService: LanguageService,
        private questionService: QuestionService,
        private categoryService: CategoryService,
        private answerService: AnswerService,
        private filterAddService: FilteraddService,
    ) {
    }

    public async getQuestions(assessmentId: number, language: string) {
        const sectionId = (await this.sectionService.getActiveSectionId()).id;
        const languageId = (await this.languageService.getLanguageId(language)).id;
        const activeQuestionsIds = (await this.questionService.getActiveQuestions(sectionId, assessmentId)).map(q => q.id);
        const questions: IQuestion[] = [];

        for (const id of activeQuestionsIds) {
            const tmpQuestion: IQuestion = {
                id: -1, title: '', subTitle: '', category: '', answers: [], selectedAnswers: [], type: '',
                mandatory: 0, filterReq: [], filterAdd: {},
            };
            const answers = (await this.answerService.getAnswers(id, languageId));
            const questionInformation = await this.questionService.getQuestionInformation(id, languageId);
            tmpQuestion.id = questionInformation.id;
            tmpQuestion.title = questionInformation.translations[0].title;
            tmpQuestion.subTitle = questionInformation.translations[0].subTitle;
            tmpQuestion.category = (await this.categoryService.getCategoryTranslationByQuestion(id, languageId)).translationShort;
            tmpQuestion.answers = this.createAnswersArray(answers);
            tmpQuestion.type = questionInformation.type.type;
            tmpQuestion.mandatory = questionInformation.mandatory;
            tmpQuestion.filterReq = questionInformation.filters.map(f => f.id);
            tmpQuestion.filterAdd = await this.filterAddService.getFilterAdd(id, languageId);
            questions.push(tmpQuestion);
        }
        return questions;
    }

    private createAnswersArray(answers: Answer[]) {
        const tmp = [];
        answers.forEach(a => {
            tmp.push({translation: a.translations[0].translation, type: a.type});
        });
        return tmp;
    }

    public async getComponentTranslations(language: string) {
        const languageId = (await this.languageService.getLanguageId(language)).id;
        return {
            checkbox_error_message: await this.questionService.getQuestionComponentData(languageId, 'checkbox_error_message'),
            dropdown_error_message: await this.questionService.getQuestionComponentData(languageId, 'dropdown_error_message'),
            radio_error_message: await this.questionService.getQuestionComponentData(languageId, 'radio_error_message'),
            select_placeholder_text: await this.questionService.getQuestionComponentData(languageId, 'select_placeholder_text'),
            pie_chart_remaining: await this.questionService.getQuestionComponentData(languageId, 'pie_chart_remaining'),
            button_previous: await this.questionService.getQuestionComponentData(languageId, 'button_previous'),
            button_restart: await this.questionService.getQuestionComponentData(languageId, 'button_restart'),
            button_next: await this.questionService.getQuestionComponentData(languageId, 'button_next'),
            your_code_text: await this.questionService.getQuestionComponentData(languageId, 'your_code_text'),
            free_placeholder: await this.questionService.getQuestionComponentData(languageId, 'free_placeholder'),
        }
    }

    public async getPopUpText(language:string) {
        const languageId = (await this.languageService.getLanguageId(language)).id;
        return await this.questionService.getQuestionComponentData(languageId, 'uuid_text');
    }
}
