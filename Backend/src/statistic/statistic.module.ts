import {CacheModule, Module} from '@nestjs/common';
import { StatisticController } from './controller/statistic.controller';
import { StatisticService } from './services/statistic.service';
import { ExportService } from '../shared/export/export.service';
import { NavigationModule } from '../navigation/navigation.module';
import { ScoringModule } from '../scoring/scoring.module';
import { LanguageService } from '../shared/language/language.service';
import { AnswerService } from '../shared/answer/answer.service';
import { Q_a_ExportController } from './controller/q_a_Export.controller';
import {Q_a_ExportService} from './services/q_a_Export.service';
import {RecordService} from '../record/service/record.service';
import {QuestionService} from '../shared/question/question.service';
import {AssessmentService} from '../shared/assessment/assessment.service';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        NavigationModule,
        ScoringModule,
        CacheModule.register(),
        AuthModule,
    ],
    controllers: [StatisticController, Q_a_ExportController],
    providers: [
        StatisticService,
        ExportService,
        LanguageService,
        AnswerService,
        Q_a_ExportService,
        RecordService,
        QuestionService,
        AssessmentService,
    ],
})
export class StatisticModule {}
