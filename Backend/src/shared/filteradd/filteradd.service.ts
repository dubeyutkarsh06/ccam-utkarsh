import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Filter_Add } from '../../models/entities/filterAdd.entity';

@Injectable()
export class FilteraddService {
    constructor(
        private readonly connection: Connection,
    ) {}

    public async getFilterAdd(questionId: number, languageId: number) {
        const filters = await this.getFilter(questionId, languageId);
        return this.createFilterObject(filters);
    }

    private createFilterObject(arr: Filter_Add[]) {
        const tmp = {};
        for ( const item of arr) {
            tmp[item.answer.translations[0].translation] = 0;
        }

        for ( const item of arr ) {
            tmp[item.answer.translations[0].translation] = item.filter.id;
        }
        return tmp;
    }

    private getFilter(questionId, languageId) {
        return this.connection
        .getRepository(Filter_Add)
        .createQueryBuilder('filter')
        .leftJoinAndSelect('filter.answer', 'answer')
        .leftJoinAndSelect('answer.translations', 'translations')
        .leftJoinAndSelect('filter.filter', 'filterOrigin')
        .where('filter.question = :questionId', {questionId})
        .andWhere('translations.language = :languageId', {languageId})
        .getMany();
    }
}
