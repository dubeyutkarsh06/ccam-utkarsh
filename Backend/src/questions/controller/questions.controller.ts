import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AssessmentService } from '../../shared/assessment/assessment.service';
import { QuestionsService } from '../service/questions.service';

@Controller('api/questions')
export class QuestionsController {
    constructor(
        private assessmentService: AssessmentService,
        private questionsService: QuestionsService,
    ) { }

    @Post('/:language/:assessment')
    public async getQuestions(@Body() filter: number[], @Param() params) {
        if (filter.length === 0) {
            const assessmentId = params.assessment >= 1 ? +params.assessment : 1;
            const questions = await this.questionsService.getQuestions(assessmentId, params.language);
            const questionTranslationData = await this.questionsService.getComponentTranslations(params.language);
            return { assessment: 1, questions, questionTranslationData };
        } else {
            const assessment = await this.assessmentService.getAssessmnet(filter, +params.assessment);
            const questionTranslationData = await this.questionsService.getComponentTranslations(params.language);
            if (assessment !== null) {
                const questions = await this.questionsService.getQuestions(assessment, params.language);
                return { assessment, questions, questionTranslationData};
            } else {
                return { assessment, questions: null , questionTranslationData};
            }
        }
    }

    @Get('popup/:language')
    public async getPopUpText(@Param() params) {
        return await this.questionsService.getPopUpText(params.language);
    }
}
