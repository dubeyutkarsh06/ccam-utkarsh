import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { Language } from './language.entity';

@Entity()
export class Question_Translation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: '1000'})
    title: string;

    @Column({ length: '2000'})
    subTitle: string;

    @ManyToOne(type => Question, question => question.translations)
    question: Question;

    @ManyToOne(type => Language, language => language.translationQuestions)
    language: Language;
}
