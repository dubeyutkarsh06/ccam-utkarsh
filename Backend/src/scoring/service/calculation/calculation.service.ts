import { Injectable } from '@nestjs/common';
import { Scoring } from '../../../models/entities/scoring.entity';
import { Connection } from 'typeorm';

@Injectable()
export class CalculationService {
    constructor(
        private connection: Connection,
    ) {}

    public calculateScore(questionId: number, answerIds: number[], assessmentId: number, scoringTypeId: number) {
        switch (scoringTypeId) {
            case 1:
                return this.calculateScoreSkalar(questionId, answerIds, assessmentId);
            case 2:
                return this.calculateScoreSelectX(questionId, answerIds, assessmentId);
            case 3:
                return this.calculateScoreBestOf(questionId, answerIds, assessmentId);
            default:
                return this.calculateScoreSkalar(questionId, answerIds, assessmentId);
        }
    }

    public calculateScoreSkalar(questionId: number, answerIds: number[], assessmentId: number) {
        return this.connection
            .getRepository(Scoring)
            .createQueryBuilder('scoring')
            .leftJoinAndSelect('scoring.question', 'question')
            .leftJoinAndSelect('scoring.answer', 'answer')
            .leftJoinAndSelect('scoring.category', 'category')
            .leftJoinAndSelect('scoring.assessmentType', 'assessment')
            .where('question.id = :questionId', { questionId })
            .andWhere('answer.id IN (:answerIds)', { answerIds })
            .andWhere('assessment.id = :assessmentId', { assessmentId })
            .select(['sum(scoring.score) AS score, category.id AS category'])
            .groupBy('category.id')
            .getRawMany();
    }

    public async calculateScoreSelectX(questionId: number, answerIds: number[], assessmentId: number) {
        const tmp = await this.connection
            .getRepository(Scoring)
            .createQueryBuilder('scoring')
            .leftJoinAndSelect('scoring.question', 'question')
            .leftJoinAndSelect('scoring.answer', 'answer')
            .leftJoinAndSelect('scoring.category', 'category')
            .leftJoinAndSelect('scoring.assessmentType', 'assessment')
            .where('question.id = :questionId', { questionId })
            .andWhere('answer.id IN (:answerIds)', { answerIds })
            .andWhere('assessment.id = :assessmentId', { assessmentId })
            .select(['(sum(scoring.score) - 1) AS score, category.id AS category'])
            .groupBy('category.id')
            .getRawMany();

        for (const item of tmp) {
            if (item.score < 0) {
                item.score = 0;
            }
        }
        return tmp;
    }

    public calculateScoreBestOf(questionId: number, answerIds: number[], assessmentId: number) {
        return this.connection
            .getRepository(Scoring)
            .createQueryBuilder('scoring')
            .leftJoinAndSelect('scoring.question', 'question')
            .leftJoinAndSelect('scoring.answer', 'answer')
            .leftJoinAndSelect('scoring.category', 'category')
            .leftJoinAndSelect('scoring.assessmentType', 'assessment')
            .where('question.id = :questionId', { questionId })
            .andWhere('answer.id IN (:answerIds)', { answerIds })
            .andWhere('assessment.id = :assessmentId', { assessmentId })
            .select(['max(scoring.score) AS score, category.id AS category'])
            .groupBy('category.id')
            .getRawMany();
    }
}
