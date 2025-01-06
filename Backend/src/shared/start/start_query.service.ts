import { Injectable } from '@nestjs/common';
import { Connection } from "typeorm";
import {Startpage} from "../../models/entities/startpage.entity";
import {TranslatableString} from "../../models/entities/translatableString.entity";
import {Translation} from "../../models/entities/translation.entity";

@Injectable()
export class Start_queryService {

    constructor(
       private connection: Connection,
    ) {}

    public async getMarkerElement(languageId: number, param: string) {
        const res = await this.connection
            .getRepository(Startpage)
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.translations', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'tts')
            .where('tts.language = :languageId', {languageId: languageId})
            .andWhere('sp.marker = :param', {param: param})
            .select('tts.value as string')
            .getRawMany();
        return res.map(t => t.string);
    }
}
