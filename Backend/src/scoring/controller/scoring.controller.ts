// @ts-ignore
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ScoringService } from '../service/scoring.service';
import { IQuestion } from '../../models/interfaces/question.interface';

@Controller('api/scoring')
export class ScoringController {
    constructor(
        private scoringService: ScoringService,
    ) { }

    @Post('/:language/:assessment')
    public getScoring(@Body() questions: IQuestion[], @Param() params) {
        return this.scoringService.getScoring(questions, params.language, +params.assessment);
    }

    @Post('/translation')
    public getScoringTranslation(@Body() data) {
        return this.scoringService.getScoringCategoryTranslation(data);
    }

    @Get('/:language/defaultCharts')
    public getDefaultCharts(@Param() params) {
        return this.scoringService.getScoringDefaultChart(params.language);
    }
}
