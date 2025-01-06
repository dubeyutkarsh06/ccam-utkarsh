import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, Column } from 'typeorm';
import { Question } from './question.entity';
import { Answer_Translation } from './answer_translation.entity';
import { Filter_Add } from './filterAdd.entity';
import { Scoring } from './scoring.entity';

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: number;

    @Column()
    order: number;

    @OneToMany(type => Answer_Translation, aTrans => aTrans.answer)
    translations: Answer_Translation[];

    @ManyToMany(type => Question, question => question.answers)
    questions: Question[];

    @OneToMany(type => Filter_Add, f => f.answer)
    filters: Filter_Add[];

    @OneToMany(type => Scoring, s => s.answer)
    scorings: Scoring[];
}
