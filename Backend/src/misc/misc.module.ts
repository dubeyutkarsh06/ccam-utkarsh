import { Module } from '@nestjs/common';
import { MiscController } from './controller/misc.controller';
import { FilterService } from './service/filter/filter.service';
import { AssessmentService } from '../shared/assessment/assessment.service';
import { LanguageService } from '../shared/language/language.service';

@Module({
    imports: [],
    controllers: [MiscController],
    providers: [FilterService, AssessmentService, LanguageService],
})
export class MiscModule {}
