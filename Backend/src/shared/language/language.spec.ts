import { LanguageService } from './language.service';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('language service', () => {
    let service: LanguageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot()],
            providers: [LanguageService],
        }).compile();
        service = module.get(LanguageService);
    });

    it('should return 1 for english', async () => {
        expect((await service.getLanguageId('english')).id).toBe(1);
    });
});
