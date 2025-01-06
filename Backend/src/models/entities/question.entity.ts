import { Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, OneToMany, Column } from 'typeorm';
import { Category } from './category.entity';
import { Question_Translation } from './question_translation.entity';
import { Answer } from './answer.entity';
import { Question_Type } from './question_type.entity';
import { Section } from './section.entity';
import { Question_Assessments_Assessment } from './question_assessments_assessment.entity';
import { Filter_Add } from './filterAdd.entity';
import { Scoring } from './scoring.entity';
import { Filter } from './filter.entity';
import { Scoring_Type } from './scoring_type.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mandatory: number;

    @ManyToMany(type => Section, section => section.questions)
    @JoinTable()
    sections: Section[];

    @ManyToMany(type => Answer, answer => answer.questions)
    @JoinTable()
    answers: Answer[];

    @OneToMany(type => Question_Assessments_Assessment, qaa => qaa.question)
    questionAssessmentsAssessment: Question_Assessments_Assessment[];

    @ManyToOne(type => Category, category => category.questions)
    category: Category;

    @ManyToOne(type => Question_Type, qType => qType.questions)
    type: Question_Type;

    @OneToMany(type => Question_Translation, qTrans => qTrans.question)
    translations: Question_Translation[];

    @OneToMany(type => Filter_Add, f => f.question)
    filtersAdd: Filter_Add[];

    @ManyToMany(type => Filter, f => f.questions)
    @JoinTable()
    filters: Filter[];

    @OneToMany(type => Scoring, s => s.question)
    scorings: Scoring[];

    @ManyToOne(type => Scoring_Type, st => st.questions)
    scoringType: Scoring_Type;
}
