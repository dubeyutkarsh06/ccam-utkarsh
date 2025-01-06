import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ScoringRequirements } from '../../../models/entities/scoringRequirements.entity';

@Injectable()
export class ScoringRequirementService {
    constructor(
        private connection: Connection,
    ) { }

    public checkScoringCondition(data: { category: string, questions: number }, assessmentId: number) {
        return this.connection
            .getRepository(ScoringRequirements)
            .createQueryBuilder('scoringRequirements')
            .leftJoinAndSelect('scoringRequirements.category', 'category')
            .leftJoinAndSelect('scoringRequirements.assessment', 'assessment')
            .where('scoringRequirements.minQuestions <= :questions', { questions: data.questions })
            .andWhere('category.id = :categoryId', { categoryId: data.category })
            .andWhere('assessment.id = :assessmentId', { assessmentId })
            .getOne();

    }

    public getMaxScore(assessmentId: number, categoryId: number) {
        return this.connection
            .getRepository(ScoringRequirements)
            .createQueryBuilder('scoReq')
            .leftJoin('scoReq.assessment', 'assessment')
            .leftJoin('scoReq.category', 'category')
            .where('category.id = :categoryId', { categoryId })
            .andWhere('assessment.id = :assessmentId', { assessmentId })
            .getOne();
    }
}
