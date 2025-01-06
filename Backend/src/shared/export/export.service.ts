import {Injectable} from '@nestjs/common';
import {Connection} from 'typeorm';
import {Record} from '../../models/entities/record.entity';
import {Scoring} from '../../models/entities/scoring.entity';
import {Category_Translation} from '../../models/entities/category_translation.entity';
import {ScoringCategory} from '../../models/entities/scoringCategory.entity';
import {Question} from '../../models/entities/question.entity';

@Injectable()
export class ExportService {

    constructor(
        private connection: Connection,
    ) { }

    public getAllRecords(assessment) {
        return this.connection
            .getRepository(Record)
            .createQueryBuilder('record')
            .where('record.assessmentId IN (:assessment)', {assessment})
            .getMany();
    }
    /**
     * get Record from DB.
     * Params contain the Format year-month-day because typeorm saves the date in this format.
     * @param fromDate
     * @param toDate
     */
    public getRecordsBetweenDates(fromDate, toDate, assessment) {
        return this.connection
            .getRepository(Record)
            .createQueryBuilder('record')
            .where('record.timestamp >= :from', {from: fromDate})
            .andWhere('record.timestamp <= :to', {to: toDate})
            .andWhere('record.assessmentId IN (:assessment)', {assessment})
            .getMany();
    }
    public getRecordsFromDate(fromDate, assessment) {
        return this.connection
            .getRepository(Record)
            .createQueryBuilder('record')
            .where('record.timestamp >= :from', {from: fromDate})
            .andWhere('record.assessmentId IN (:assessment)', {assessment})
            .getMany();
    }

    public getRecordsToDate(toDate, assessment) {
        return this.connection
            .getRepository(Record)
            .createQueryBuilder('record')
            .andWhere('record.timestamp <= :to', {to: toDate})
            .andWhere('record.assessmentId IN (:assessment)', {assessment})
            .getMany();
    }

    public async getScoringCategory(langId) {
        const categories = await this.connection
            .getRepository(ScoringCategory)
            .createQueryBuilder('sc')
            .leftJoinAndSelect('sc.translation', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'ts')
            .andWhere('ts.language = :langId', {langId})
            .select(['ts.value as text', 'sc.id as id'])
            .getRawMany();
        return categories.map(p => {
            const obj = {
                id: '',
                value: '',
            };
            obj.id = p.id;
            obj.value = p.text;
            return obj;
        });

    }

    public async getCategoryIDs(categories: string[]) {
        const categoryIds = await this.connection
            .getRepository(ScoringCategory)
            .createQueryBuilder('sc')
            .leftJoinAndSelect('sc.translation', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'ts')
            .where('ts.value IN (:categories)', {categories})
            .select(['sc.id as value', 'ts.value as text'])
            .getRawMany();
        return categoryIds.map(p => {
            const obj = {
                id: '',
                value: '',
            };
            obj.id = p.value;
            obj.value = p.text;
            return obj;
        });
    }

    public async getAllQuestionTitles(languageId: number) {
        return this.connection
            .getRepository(Question)
            .createQueryBuilder('q')
            .leftJoin('q.questionAssessmentsAssessment', 'assessment')
            .leftJoinAndSelect('q.translations', 'translation')
            .andWhere('translation.language = :languageId', {languageId})
            .orderBy('assessment.assessmentType')
            .getMany();
    }

    public async getAllQuestionTitlesByLanguage(language: number) {
        return this.connection
            .getRepository(Question)
            .createQueryBuilder('q')
            .leftJoin('q.questionAssessmentsAssessment', 'assessment')
            .leftJoinAndSelect('q.translations', 'translation')
            .andWhere('translation.language = :language', {language})
            .orderBy('assessment.assessmentType')
            .getMany();
    }
}
