import { Module } from '@nestjs/common';
import { NavigationController } from './controller/navigation.controller';
import { NavigationService } from './service/navigation.service';
import { LanguageService } from '../shared/language/language.service';
import { SectionService } from '../shared/section/section.service';
import { CategoryService } from '../shared/category/category.service';
import { QuestionService } from '../shared/question/question.service';
import { ScoringCategoryService } from '../scoring/service/scoringCategory/scoringCategory.service';

@Module({
    imports: [],
    controllers: [NavigationController],
    providers: [NavigationService, LanguageService, SectionService, CategoryService, QuestionService, ScoringCategoryService],
    exports: [NavigationService]
})
export class NavigationModule {}
