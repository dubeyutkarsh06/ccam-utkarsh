import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Answer } from '../../models/entities/answer.entity';

@Injectable()
export class AnswerService {
    constructor(
        private readonly connection: Connection,
    ) {}

    public async getAnswers(questionId: number, languageId: number) {
        const answerIds = (await this.getAnswerIds(questionId)).map( a => a.id);
        if(answerIds.length === 0) return [];
        return await this.getAnswerTranslations(answerIds, languageId);
    }

    public getAnswerIdByString(selectedAnswers: string[], questionId: number, languageId: number) {
        return this.connection
            .getRepository(Answer)
            .createQueryBuilder('answer')
            .leftJoinAndSelect('answer.translations', 'translations')
            .leftJoinAndSelect('answer.questions', 'questions')
            .where('translations.translation IN (:selectedAnswers)', { selectedAnswers })
            .andWhere('questions.id = :questionId', { questionId })
            .andWhere('translations.language = :languageId', { languageId })
            .select('answer.id')
            .getMany();
    }

    public getAnswerTranslations(answerIds: number[], languageId: number) {
        return this.connection
            .getRepository(Answer)
            .createQueryBuilder('answer')
            .leftJoinAndSelect('answer.translations', 'translations')
            .where('translations.language = :languageId', { languageId })
            .andWhere('answer.id IN (:answerIds)', { answerIds })
            .orderBy('answer.order', 'ASC')
            .getMany();
    }

    private getAnswerIds(questionId: number) {
        return this.connection
            .getRepository(Answer)
            .createQueryBuilder('answer')
            .leftJoin('answer.questions', 'questions')
            .where('questions.id = :questionId', { questionId })
            .orderBy('answer.order', 'ASC')
            .getMany();
    }
}
