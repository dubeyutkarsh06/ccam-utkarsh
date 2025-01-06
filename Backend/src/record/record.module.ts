import { Module } from '@nestjs/common';
import { RecordController } from './controller/record.controller';
import { RecordService } from './service/record.service';
import { LanguageService } from '../shared/language/language.service';
import { QuestionService } from '../shared/question/question.service';
import {AnswerService} from '../shared/answer/answer.service';
import {AssessmentService} from '../shared/assessment/assessment.service';

@Module({
  imports: [],
  controllers: [RecordController],
  providers: [RecordService, LanguageService, QuestionService, AnswerService, AssessmentService],
})
export class RecordModule {}
