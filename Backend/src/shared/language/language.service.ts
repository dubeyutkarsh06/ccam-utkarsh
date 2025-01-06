import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Language } from '../../models/entities/language.entity';

@Injectable()
export class LanguageService {
    constructor(
        private readonly connection: Connection,
    ) { }

    public getLanguageId(language: string) {
        return this.connection
            .getRepository(Language)
            .createQueryBuilder('language')
            .where('language.name = :language', { language })
            .getOne();
    }

    public getLanguageName(id: number) {
        return this.connection
            .getRepository(Language)
            .createQueryBuilder('language')
            .where('language.id = :id', { id })
            .getOne();
    }

    public getLanguages() {
        return this.connection
            .getRepository(Language)
            .createQueryBuilder('l')
            .select('l.id')
            .getMany();
    }
}
