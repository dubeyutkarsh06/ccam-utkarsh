import { Body, Controller, Get, UseGuards, Post, HttpStatus, Res, HttpException, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { StatisticService } from '../services/statistic.service';
import { LanguageService } from '../../shared/language/language.service';
import { ExportData } from '../../models/interfaces/exportData.interface';
import { Response } from 'express';
import fs = require('fs');
@Controller('api/statistic')
export class StatisticController {

    constructor(
        private statisticService: StatisticService,
        private languageService: LanguageService,
    ) { }

    @Post('export')
    @UseGuards(JwtAuthGuard)
    export(@Body() input: ExportData): String {
        const job_id = this.statisticService.exportData(input);
        return job_id;
    }

    @Get('export/progress/:job_id')
    @UseGuards(JwtAuthGuard)
    exportProgress(@Param('job_id') job_id): String {
        const progress = this.statisticService.reportExportProgress(job_id);
        return progress.toString();
    }

    @Post('export/download')
    @UseGuards(JwtAuthGuard)
    async get_exported_file(@Body() input: { job_id: string }, @Res() res: Response) {
        const data = this.statisticService.getExportedFile(input.job_id);
        // console.log(`Returned file for ${input.job_id}`);
        // res.status(HttpStatus.OK).send(data);
    }


    @Get('languages')
    async getLanguages() {
        const languageIds = await this.languageService.getLanguages();
        const res = [];
        for (let i = 0; i < languageIds.length; i++) {
            const language = await this.languageService.getLanguageName(languageIds[i].id);
            res.push({
                value: language.name,
                label: language.name.charAt(0).toUpperCase() + language.name.slice(1),
            });
        }
        return res;
    }

    @Get('data')
    @UseGuards(JwtAuthGuard)
    async getData() {
        return this.statisticService.getData();
    }

    @Get('csv')
    @UseGuards(JwtAuthGuard)
    getCSV() {
        try {
            return this.statisticService.getCSV();
        } catch (e) {
            if (e === 'Service Unavailable') {
                throw new HttpException('Service Unavailable', HttpStatus.SERVICE_UNAVAILABLE);
            } else {
                throw e;
            }
        }
    }
}
