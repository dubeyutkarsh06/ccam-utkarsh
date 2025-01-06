import { Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => Question, question => question.sections)
    questions: Question[];
}
