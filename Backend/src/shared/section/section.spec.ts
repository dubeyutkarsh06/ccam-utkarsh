import { SectionService } from './section.service';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('SectionService', () => {
    let service: SectionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot()],
            providers: [SectionService],
        }).compile();
        service = module.get(SectionService);
    });

    it('should return a single number greater than 0', async () => {
        expect((await service.getActiveSectionId()).id).toBeGreaterThanOrEqual(1);
    });
});
