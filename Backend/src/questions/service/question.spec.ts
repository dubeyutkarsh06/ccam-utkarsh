import { LanguageService } from '../../shared/language/language.service';
import { SectionService } from '../../shared/section/section.service';
import { FilteraddService } from '../../shared/filteradd/filteradd.service';
import { AnswerService } from '../../shared/answer/answer.service';
import { CategoryService } from '../../shared/category/category.service';
import { QuestionService } from '../../shared/question/question.service';
import { QuestionsService } from './questions.service';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('QuestionService', () => {
    let service: QuestionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot()],
            providers: [QuestionsService, AnswerService, QuestionService, CategoryService, FilteraddService, SectionService, LanguageService],
        }).compile();
        service = module.get(QuestionsService);
    });

    it('should return not empty IQuestion Array', async () => {
        expect(await service.getQuestions(1, 'english')).toEqual(jasmine.any(Array));
        expect((await service.getQuestions(1, 'english')).length).toBeGreaterThan(0);
    });
});
