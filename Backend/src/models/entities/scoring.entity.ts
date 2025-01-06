import { Entity, ManyToOne, Column } from 'typeorm';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { Assessment_Type } from './assessment_type.entity';
import { ScoringCategory } from './scoringCategory.entity';

@Entity()
export class Scoring {

    @Column('decimal', { precision: 5, scale: 2 })
    score: number;

    @ManyToOne(type => Question, q => q.scorings, { primary: true })
    question: Question;

    @ManyToOne(type => Answer, a => a.scorings, { primary: true })
    answer: Answer;

    @ManyToOne(type => Assessment_Type, at => at.scorings, { primary: true })
    assessmentType: Assessment_Type;

    @ManyToOne(type => ScoringCategory, c => c.scorings, { primary: true })
    category: ScoringCategory;
}
