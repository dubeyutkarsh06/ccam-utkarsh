import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IQuestion } from '../../models/interfaces/question.interface';
import { FilterService } from '../service/filter/filter.service';
import { AssessmentService } from '../../shared/assessment/assessment.service';
import { LanguageService } from '../../shared/language/language.service';

@Controller('api/misc')
export class MiscController {
    constructor(
        private filterService: FilterService,
        private assessmentService: AssessmentService,
        private languageService: LanguageService,
    ) { }

    @Post('/filter')
    public getFilter(@Body() questions: IQuestion[]) {
        return this.filterService.getFilter(questions);
    }

    @Post('/assessment')
    public getAssessment(@Body() filters: number[]) {
        return this.assessmentService.getAssessmnet(filters, -1);
    }

    @Get('/assessmentId/:uuid')
    public getAssessmentByRecord(@Param() params) {
        return this.assessmentService.getAssessmentByRecord(params.uuid);
    }

    @Get('/:language/:assessment')
    public async getAssessmentFinish(@Param() params) {
        const language = await this.languageService.getLanguageId(params.language);
        return await this.assessmentService.getAssessmentFinish(+params.assessment, language.id);
    }
}
