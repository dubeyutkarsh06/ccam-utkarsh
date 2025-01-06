import { Entity, ManyToOne, Column } from 'typeorm';
import { Question } from './question.entity';
import { Assessment_Type } from './assessment_type.entity';

@Entity()
export class Question_Assessments_Assessment {

    @ManyToOne(type => Question, question => question.questionAssessmentsAssessment, { primary: true })
    question: Question;

    @ManyToOne(type => Assessment_Type, at => at.questionAssessmentsAssessment, { primary: true })
    assessmentType: Assessment_Type;

    @Column()
    order: number;
}
