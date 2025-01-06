import { Entity, ManyToOne, Column } from 'typeorm';
import { Assessment_Type } from './assessment_type.entity';
import { ScoringCategory } from './scoringCategory.entity';

@Entity()
export class ScoringRequirements {

    @ManyToOne(type => ScoringCategory, { primary: true })
    category: ScoringCategory;

    @ManyToOne(type => Assessment_Type, { primary: true })
    assessment: Assessment_Type;

    @Column()
    minQuestions: number;

    @Column()
    maxScore: number;
}
