import {Body, Controller, Param, Post} from '@nestjs/common';
import {Q_a_ExportService} from '../services/q_a_Export.service';

@Controller('api/statistic')
export class Q_a_ExportController {

    constructor(
        private qaExportService: Q_a_ExportService,
    ) { }

    @Post('qaExport/:language')
    public async export(@Body() input: string[], @Param() params) {
        return await this.qaExportService.getExportData(input, params.language);
    }
}
