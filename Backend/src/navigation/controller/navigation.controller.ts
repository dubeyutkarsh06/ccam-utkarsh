import { Controller, Get, Param } from '@nestjs/common';
import { NavigationService } from '../service/navigation.service';

@Controller('api/navigation')
export class NavigationController {
    constructor(
        private readonly navigationService: NavigationService,
    ) {}

    @Get('/scoring/:language')
    public async getScoringCategories(@Param() params) {
        return await this.navigationService.getScoringCategories(params.language);
    }

    @Get('/scoring/:language/chart')
    public async getChartScoringCategories(@Param() params) {
        return await this.navigationService.getChartScoringCategories(params.language);
    }

    @Get('/:language')
    public async getAllCategories(@Param() params) {
        return await this.navigationService.getAllCategories(params.language);
    }
}
