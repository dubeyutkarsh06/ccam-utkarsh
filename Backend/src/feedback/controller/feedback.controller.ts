import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { FeedbackService } from '../service/feedback.service';

@Controller('api/feedback')
export class FeedbackController {
    constructor(
        private feedbackService: FeedbackService,
    ) {}

    @Post('/:language/:assessment')
    public getFeedback(@Body() scoring, @Param() params) {
        return this.feedbackService.getFeedback(scoring, +params.assessment, params.language);
    }
}
