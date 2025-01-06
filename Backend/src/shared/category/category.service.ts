import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Category_Translation } from '../../models/entities/category_translation.entity';
import { ScoringCategory } from '../../models/entities/scoringCategory.entity';
import {Startpage} from "../../models/entities/startpage.entity";
import {Navigation_translations} from "../../models/entities/navigation_translations.entity";

@Injectable()
export class CategoryService {
    constructor(
        private readonly connection: Connection,
    ) { }

    public getCategoryTranslationByQuestion(questionId: number, languageId: number) {
        return this.connection
            .getRepository(Category_Translation)
            .createQueryBuilder('category_translation')
            .leftJoin('category_translation.category', 'category')
            .leftJoin('category.questions', 'questions')
            .where('questions.id = :questionId', { questionId })
            .andWhere('category_translation.languageId = :languageId', { languageId })
            .getOne();
    }

    public getQuestionCategories(questionIds: number[], languageId: number) {
        return this.connection
            .getRepository(Category_Translation)
            .createQueryBuilder('ct')
            .leftJoin('ct.category', 'category')
            .leftJoin('category.questions', 'questions')
            .where('ct.language = :languageId', { languageId })
            .andWhere('questions.id IN (:questionIds)', { questionIds })
            .getMany();
    }

    public getScoringCategoryByString(category: string) {
        return this.connection
            .getRepository(ScoringCategory)
            .createQueryBuilder('sc')
            .leftJoinAndSelect('sc.translation', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'ts')
            .where('ts.value = :category', { category })
            .getOne();
    }

    public async getNavigationTranslation(languageId: number, param) {
        const res = await this.connection
            .getRepository(Navigation_translations)
            .createQueryBuilder('nt')
            .leftJoinAndSelect('nt.translations', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'tts')
            .where('tts.language = :languageId', {languageId: languageId})
            .andWhere('nt.marker = :param', {param: param})
            .select('tts.value as string')
            .getRawMany();
        return res.map(t => t.string);
    }

    public async getScoringTranslation(categoryId: number, languageId: number) {
        const res = await this.connection
            .getRepository(ScoringCategory)
            .createQueryBuilder('sc')
            .leftJoinAndSelect('sc.translation', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'ts')
            .where('sc.id = :categoryId', {categoryId: categoryId})
            .andWhere('ts.language = :languageId', {languageId: languageId})
            .select('ts.value as string')
            .getRawOne();
        return res.string;
    }
}
