import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Answer } from './answer.entity';
import { Language } from './language.entity';

@Entity()
export class Answer_Translation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 1000})
    translation: string;

    @ManyToOne(type => Answer, answer => answer.translations)
    answer: Answer;

    @ManyToOne(type => Language, language => language.translations)
    language: Language;
}
