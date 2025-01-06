import { Entity, PrimaryGeneratedColumn, OneToMany, Column, OneToOne } from 'typeorm';
import { Question_Assessments_Assessment } from './question_assessments_assessment.entity';
import { Forwarding } from './forwarding.entity';
import { Scoring } from './scoring.entity';

@Entity()
export class Assessment_Type {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Question_Assessments_Assessment, qaa => qaa.assessmentType)
    questionAssessmentsAssessment: Question_Assessments_Assessment[];

    @OneToOne(type => Forwarding, f => f.assessmentType)
    forwardings: Forwarding[];

    @OneToMany(type => Scoring, s => s.assessmentType)
    scorings: Scoring[];
}
