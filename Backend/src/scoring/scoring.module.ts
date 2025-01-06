// @ts-ignore
import { Module } from '@nestjs/common';
import { ScoringController } from './controller/scoring.controller';
import { ScoringService } from './service/scoring.service';
import { QuestionService } from '../shared/question/question.service';
import { AnswerService } from '../shared/answer/answer.service';
import { LanguageService } from '../shared/language/language.service';
import { AssessmentService } from '../shared/assessment/assessment.service';
import { CalculationService } from './service/calculation/calculation.service';
import { ScoringCategoryService } from './service/scoringCategory/scoringCategory.service';
import { ScoringRequirementService } from './service/scoringRequirement/scoringRequirement.service';
import { FilterService } from '../misc/service/filter/filter.service';
import {CategoryService} from '../shared/category/category.service';

@Module({
    imports: [],
    controllers: [ScoringController],
    providers: [ScoringService, QuestionService, AnswerService, LanguageService,
        AssessmentService, CalculationService, ScoringCategoryService, ScoringRequirementService, FilterService, CategoryService],
    exports: [ScoringService],
})
export class ScoringModule {}
