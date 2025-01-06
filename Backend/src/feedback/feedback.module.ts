import { Module } from '@nestjs/common';
import { FeedbackService } from './service/feedback.service';
import { FeedbackController } from './controller/feedback.controller';
import { LanguageService } from '../shared/language/language.service';
import { CategoryService } from '../shared/category/category.service';

@Module({
    imports: [],
    controllers: [FeedbackController],
    providers: [FeedbackService, LanguageService, CategoryService],
})
export class FeedbackModule {}
