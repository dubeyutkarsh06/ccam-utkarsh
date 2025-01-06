import { NavigationService } from './navigation.service';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageService } from '../../shared/language/language.service';
import { SectionService } from '../../shared/section/section.service';
import { CategoryService } from '../../shared/category/category.service';
import { QuestionService } from '../../shared/question/question.service';

describe('NavigationService', () => {
    let service: NavigationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot()],
            providers: [NavigationService, LanguageService, SectionService, CategoryService, QuestionService],
        }).compile();
        service = module.get(NavigationService);
    });

    it('should return not empty array', async () => {
        expect((await service.getAllCategories('english')).length).toBeGreaterThan(0);
        expect((await service.getScoringCategories('english')).length).toBeGreaterThan(0);
    });
});
