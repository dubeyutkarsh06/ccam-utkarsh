import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ScoringCategory } from '../../../models/entities/scoringCategory.entity';
import { Scoring } from '../../../models/entities/scoring.entity';
import { ScoringDefaultChart } from '../../../models/entities/scoringDefaultChart.entity';

@Injectable()
export class ScoringCategoryService {
    constructor(
        private connection: Connection,
    ) { }

    public getScoringCategory(questionId: number, answerIds: number[], assessmentId: number) {
        return this.connection
            .getRepository(Scoring)
            .createQueryBuilder('scoring')
            .leftJoin('scoring.question', 'question')
            .leftJoinAndSelect('scoring.category', 'category')
            .leftJoin('scoring.assessmentType', 'assessment')
            .leftJoin('scoring.answer', 'answer')
            .where('question.id = :questionId', { questionId })
            .andWhere('answer.id IN (:answerIds)', { answerIds })
            .andWhere('assessment.id = :assessmentId', { assessmentId })
            // .andWhere('scoring.score > 0.00')
            .select('DISTINCT category.id')
            .getRawMany();
    }

    public async getScoringCategoryTranslationByCategory(categoryId: number, languageId: number) {
        return (await this.connection
            .getRepository(ScoringCategory)
            .createQueryBuilder('sc')
            .leftJoinAndSelect('sc.translation', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'ts')
            .where('sc.id = :categoryId', { categoryId })
            .andWhere('ts.language = :languageId', { languageId })
            .getOne()).translation.translatableStrings[0].value;
    }

    public getScoringCategories(questionIds: number[], languageId: number) {
        return this.connection
            .getRepository(Scoring)
            .createQueryBuilder('scoring')
            .leftJoinAndSelect('scoring.category', 'category')
            .leftJoinAndSelect('scoring.question', 'question')
            .leftJoinAndSelect('category.translation', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'ts')
            .where('ts.language = :languageId', { languageId })
            .andWhere('question.id IN (:questionIds)', { questionIds })
            .select('DISTINCT category.id, ts.value, category.type')
            .getRawMany();
    }

    public getDefaultCharts(languageId: number) {
        const query = 
        this.connection
            .getRepository(ScoringDefaultChart)
            .createQueryBuilder('scoringDefaultChart')
            .leftJoinAndSelect('scoringDefaultChart.translation', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'ts')
            .leftJoinAndSelect('scoringDefaultChart.category', 'scoringCategory')
            .leftJoinAndSelect('scoringCategory.translation', 'categoryTranslation')
            .leftJoinAndSelect('categoryTranslation.translatableStrings', 'categoryTranslatableStrings')
            .where('categoryTranslatableStrings.language = :languageId', { languageId })
            .andWhere('ts.language = :languageId', { languageId })
            .select('ts.value as state, scoringDefaultChart.percentage as percentage, categoryTranslatableStrings.value as categoryName')
        console.log(query.getSql());
        return query.getRawMany();
    }
}
