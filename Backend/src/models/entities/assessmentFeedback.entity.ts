import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Feedback } from './feedback.entity';
import { Assessment_Type } from './assessment_type.entity';
import { Category } from './category.entity';

@Entity()
export class AssessmentFeedback {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    minScore: number;

    @ManyToOne(type => Feedback, f => f.assessmentFeedback)
    feedback: Feedback;

    @ManyToOne(type => Assessment_Type)
    assessment: Assessment_Type;

    @ManyToOne(type => Category)
    category: Category;
}
