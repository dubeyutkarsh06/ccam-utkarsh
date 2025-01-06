import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { StartService } from "../service/start.service";
import {Marker} from "../../models/interfaces/marker.interface";

@Controller('api/start')
export class StartController {

    constructor(
        private startService: StartService
    ) {}

    @Get('/texts/:language')
    public async getScoringCategories(@Param() language) {
        return await this.startService.getStart(language.language);
    }
}
