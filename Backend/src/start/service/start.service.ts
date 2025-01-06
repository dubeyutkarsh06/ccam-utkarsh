import {Injectable} from '@nestjs/common';
import {Start_queryService} from "../../shared/start/start_query.service";
import {LanguageService} from "../../shared/language/language.service";

@Injectable()
export class StartService {

    constructor(
       private startQueryService: Start_queryService,
       private languageService: LanguageService
    ) {}

    public async getStart(language: string) {
        const languageId = (await this.languageService.getLanguageId(language)).id;

        return {
            reload_label: await this.startQueryService.getMarkerElement(languageId, 'reload-label'),
            reload_button: await this.startQueryService.getMarkerElement(languageId, 'reload-button'),
            title: await this.startQueryService.getMarkerElement(languageId, 'title'),
            subtitle: await this.startQueryService.getMarkerElement(languageId, 'subtitle'),
            text1: await this.startQueryService.getMarkerElement(languageId, 'text1'),
            text2: await this.startQueryService.getMarkerElement(languageId, 'text2'),
            text3: await this.startQueryService.getMarkerElement(languageId, 'text3'),
            text4: await this.startQueryService.getMarkerElement(languageId, 'text4'),
            start_button: await this.startQueryService.getMarkerElement(languageId, 'start-button'),
            finish_text: await this.startQueryService.getMarkerElement(languageId, 'finish-text'),
            code: await this.startQueryService.getMarkerElement(languageId, 'code'),
        };
    }
}
