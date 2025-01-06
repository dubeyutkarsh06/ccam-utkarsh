import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Question_Type {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(type => Question, question => question.type)
    questions: Question[];
}
