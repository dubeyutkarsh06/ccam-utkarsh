import { Module } from '@nestjs/common';
import { LanguageService } from '../shared/language/language.service';
import { SectionService } from '../shared/section/section.service';
import { FilteraddService } from '../shared/filteradd/filteradd.service';
import { AnswerService } from '../shared/answer/answer.service';
import { CategoryService } from '../shared/category/category.service';
import { AssessmentService } from '../shared/assessment/assessment.service';
import { QuestionService } from '../shared/question/question.service';
import { QuestionsController } from './controller/questions.controller';
import { QuestionsService } from './service/questions.service';

@Module({
    imports: [],
    controllers: [QuestionsController],
    providers: [LanguageService, SectionService, FilteraddService, AnswerService, CategoryService, QuestionService,
        AssessmentService, QuestionsService],
})
export class QuestionsModule { }
