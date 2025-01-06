import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { IQuestion } from '../../models/interfaces/question.interface';
import { RecordService } from '../service/record.service';

@Controller('api/record')
export class RecordController {
    constructor(
        private recordService: RecordService,
    ) { }

    @Get('/uuid/:language/:assessmentId')
    public async getUuid(@Param() params) {
        return await this.recordService.getUuid(params.language, params.assessmentId);
    }

    @Get('/:uuid')
    public async getRecord(@Param() params) {
        return await this.recordService.getRecord(params.uuid);
    }

    @Post('/:uuid/:language/:assessmentId')
    public async postRecord(@Body() questions: IQuestion[], @Param() params) {
        const uuid = await this.recordService.postRecord(questions, params.uuid, params.language, params.assessmentId);
        return { uuid };
    }

    @Post('/translation/:language')
    public getRecordTranslation(@Body() data, @Param() params) {
        return this.recordService.getRecordTranslation(data, params.language);
    }
}
